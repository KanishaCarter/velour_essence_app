const express = require("express");
const server = express();
const pg = require("pg");
const path = require("path");
const dotenv = require("dotenv").config();
const client = new pg.Client(process.env.DATABASE_URL || "postgres://localhost/velour_essence_app");

const init = async () => {
    await client.connect();

    const SQL = `
    DROP TABLE IF EXISTS all_scents;
    
    CREATE TABLE all_scents (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    designer TEXT NOT NULL,
    size DECIMAL NOT NULL,
    price DECIMAL NOT NULL,
    family TEXT NOT NULL,
    type TEXT NOT NULL,
    notes TEXT NOT NULL,
    );
    
    INSERT INTO scents (name, designer, size, price, family, type, notes) VALUES
    ("Lost Cherry Eau de Parfum Fragrance", "Tom Ford", 3.4, 615.00, "Warm & Spicy", "Warm & Sweet Gourmands", "Black Cherry, Tonka Bean, Almond"),
    ("Donna Born In Roma Eau de Parfum", "Valentino", 1.7, 140.00, "Floral", "Warm Florals", "Blackcurrant, Jasmine Grandiflorum, Bourbon Vanilla"),
    ("Mon Paris Eau de Parfum", "Yves Saint Laurent", 1.6, 120.00, "Floral", "Fruity Floral", "Datura Flower, Patchouli, Red Berries");`;

    await client.query(SQL);
    console.log("data updated");

    const port = process.env.PORT || 3000;
    server.listen(port, () => console.log (`listening on port ${port}`));
};

init();

// static routes
server.use(express.static(path.join(__dirname, "../client/dist")));

// server routes
server.get("/", (req, res) =>
res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

// returns array of scent objects
server.get("/api/scents", async (req, res, next) => {
    try {
        const SQL = `
        SELECT * from scents;
        `;
        const response = await client.query(SQL);
        res.send(response.rows);
    } catch (ex) {
        next(ex);
    }
});