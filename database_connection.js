/**
 * Table name for the colors is called 'color_details'
 */
const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, error => {
    if(error) return console.error(error.message)

    console.log("Database connection successful...")
})

const range = function randomNumberGeneratorInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

exports.db = db
exports.range = range



