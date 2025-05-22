require("dotenv").config();
const express = require("express");
const server = express();
const pg = require("pg");
const path = require("path");

const client = new pg.Client(process.env.DATABASE_URL);

server.use(express.static(path.join(__dirname, "../client/dist")));
server.use(express.json());


server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// API Route gets all scents
server.get("/api/scents", async (req, res, next) => {
  try {
    const SQL = `SELECT * FROM scents;`;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (ex) {
    next(ex);
  }
});

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

const init = async () => {
  try {
    await client.connect();
    console.log("Connected to DB");

    const SQL = `
      DROP TABLE IF EXISTS scents;

      CREATE TABLE scents (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          designer TEXT NOT NULL,
          size DECIMAL NOT NULL,
          price DECIMAL NOT NULL,
          family TEXT NOT NULL,
          type TEXT NOT NULL,
          notes TEXT NOT NULL
      );

      INSERT INTO scents (name, designer, size, price, family, type, notes) VALUES
      ('Lost Cherry Eau de Parfum Fragrance', 'Tom Ford', 3.4, 615.00, 'Warm & Spicy', 'Warm & Sweet Gourmands', 'Black Cherry, Tonka Bean, Almond'),
      ('Donna Born In Roma Eau de Parfum', 'Valentino', 1.7, 140.00, 'Floral', 'Warm Florals', 'Blackcurrant, Jasmine Grandiflorum, Bourbon Vanilla'),
      ('Mon Paris Eau de Parfum', 'Yves Saint Laurent', 1.6, 120.00, 'Floral', 'Fruity Floral', 'Datura Flower, Patchouli, Red Berries');
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
