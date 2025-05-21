const express = require("express");
const server = express();
const pg = require("pg");
const path = require("path");

const client = new pg.Client(
    process.env.DATABASE_URL || "postgres://localhost/velour_essence_app"
);

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
    ("Mon Paris Eau de Parfum", "Yves Saint Laurent", 1.6, 120.00, "Floral", "Fruity Floral", "Datura Flower, Patchouli, Red Berries")`
}