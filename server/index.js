require("dotenv").config();
const express = require("express");
const server = express();
const pg = require("pg");
const path = require("path");
const jwt = require("jsonwebtoken");
const path = require("path");

const client = new pg.Client(process.env.DATABASE_URL);

server.use(express.static(path.join(__dirname, "../dist")));
server.use(express.json());


server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Registration 
server.post("/api/register", async (req, res, next) => {
  try {
    const {username, password, name, address, phoneNumber} = req.body;
    const hashpassword = await bcrypt.hash(password, 8);

    const SQL = `
    INSERT INTO users (username, password, name, address, phoneNumber)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, username;
    `;

    const response = await client.query(SQL, [
      username,
      hashpassword,
      name,
      address,
      phoneNumber,
    ]);

    const user = response.rows[0];
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
    res.send({token});
    } catch (err) {
      next(err);
    }
});

// Login
server.post("/api/login", async (req, res, next) => {
  try {
    const {username, password} = req.body;
    const SQL = `
    SELECT * FROM users 
    WHERE username = $1;`;
    
    const response = await client.query(SQL, [username]);
    const user = response.rows[0];
    if (!user) {
      return res.status(400).send({error: "There's no account associated with the username or password provided."});
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
      return res.status(400).send({error:"There's no account associated with the username or password provided."});
    }
    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET);
    res.send({token});
  } catch (err) {
    next(err);
  }
});

// Gets all scents
server.get("/api/scents", async (req, res, next) => {
  try {
    const SQL = `SELECT * FROM scents;`;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (ex) {
    next(err);
  }
});

// Gets account info
server.get("/api/account", async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
      return res.status(400).send({message: "Token not found"});
    }
    const jwt = jwt.verify(token, process.env.JWT_SECRET);
    const userId = jwt.id;

    const SQL = `SELECT id, username, name, address, phoneNumber
    FROM users
    WHERE id = $1;`;
    const response = await client.query(SQL, [userId]);
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

//Gets favorites
server.get("/api/favorites", async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
      return res.status(400).send({message: "Token not found"});
    }
    const jwt = jwt.verify(token, process.env.JWT_SECRET);
    const userId = jwt.id;

    const SQL = `
    SELECT scents.*
    FROM favorites
    JOIN scents ON favorites.scentId = scents.id
    WHERE favorites.userId = $1;`;

    const response = await client.query(SQL, [userId]);
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

// User's Orders list
server.get("/api/orders", async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
      return res.status(400).send({message: "Token not found"})
    }
    const jwt = jwt.verify(token, process.env.JWT_SECRET);
    const userId = jwt.id;

    const SQL =`
    SELECT *
    FROM orders
    WHERE userId = $1
    ORDER BY createdAt DESC;`;
    const response = await client.query(SQL, [userId]);
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});

// Gets single order
server.get("/api/orders/{id}", async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = auth && auth.split(' ')[1];

    if (!token) {
      return res.status(400).send({message: "No token found"});
    }
    const jwt = jwt.verify(token, process.env.JWT_SECRET);
    const userId = jwt.id;
    const orderId = req.params.id;

    const SQL = `
    SELECT *
    FROM orders
    WHERE id = $1 AND userId = $2;`;
    const response = await client.query(SQL, [orderId, userId]);

    if (response.rows.length === 0) {
      return res.status(401).send({message: "No order found"});
    }
    res.send(response.rows[0]);
  } catch(err) {
    next(err);
  }
});

// Gets one Scent's card
server.get("/api/scents/{id}", async (req, res, next) => {
  try {
    const scentId = req.params.id;
    const SQL = `
    SELECT *
    FROM scents
    WHERE id = $1;`;
    const response = await client.query(SQL, [scentId]);

    if (response.rows.length === 0) {
      return res.status(401).send({message: "Scent not found"});
    }
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});


// Handles errors
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

const init = async () => {
  try {
    await client.connect();
    console.log("Connected to DB");

    const SQL = `
    DROP TABLE IF EXISTS users;  
    DROP TABLE IF EXISTS scents;
    DROP TABLE IF EXISTS favorites;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS orderdetails;  

      CREATE TABLE users (
      id UUID SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(10) NOT NULL,
      name VARCHAR(100) NOT NULL,
      address VARCHAR(100) NOT NULL,
      phoneNumber VARCHAR(10) NOT NULL
      );

      CREATE TABLE scents (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          designer VARCHAR(100) NOT NULL,
          size DECIMAL NOT NULL,
          price DECIMAL NOT NULL,
          family VARCHAR(255) NOT NULL,
          type VARCHAR(255) NOT NULL,
          notes VARCHAR(255) NOT NULL
      );

      CREATE TABLE favorites (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id),
      scentId INTEGER REFERENCES scents(id),
      );

      CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      userId INTEGER REFERENCES users(id),
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      );

      CREATE TABLE orderDetails (
      id SERIAL PRIMARY KEY,
      orderId INTEGER REFERENCES orders(id),
      scentId INTEGER REFERENCES scents(id),
      qty INTEGER NOT NULL
      );

      INSERT INTO scents (name, designer, size, price, family, type, notes) VALUES
      ('Lost Cherry Eau de Parfum Fragrance', 'Tom Ford', 3.4, 615.00, 'Warm & Spicy', 'Warm & Sweet Gourmands', 'Black Cherry, Tonka Bean, Almond'),
      ('Donna Born In Roma Eau de Parfum', 'Valentino', 1.7, 140.00, 'Floral', 'Warm Florals', 'Blackcurrant, Jasmine Grandiflorum, Bourbon Vanilla'),
      ('Mon Paris Eau de Parfum', 'Yves Saint Laurent', 1.6, 120.00, 'Floral', 'Fruity Floral', 'Datura Flower, Patchouli, Red Berries');
      
      INSERT INTO users (username, password, name, address, phoneNumber) VALUES
      ('kaycee45', 'ifghtydp', 'Kanisha Carter', '105 E Dog Lane Euless, TX 76039', 8178512641);
      
      INSERT INTO orders (userId) VALUES
      (1),

      INSERT INTO ordersDetails (orderId, scentId, qty) VALUES
      (1, 1, 2);

      INSERT INTO favorites (userId, scentId) VALUES
      (1, 1);
    `;

    await client.query(SQL);
    console.log("Database seeded");

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

init();
