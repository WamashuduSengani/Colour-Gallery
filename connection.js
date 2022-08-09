const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const app = express()
const port = 5000
// lsof -i tcp:5000
// kill -9 3014

const database = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, error => {
    if(error) return console.error(error.message)

    console.log("Database connection successful...")
})

app.listen(port, () => console.log(`Connected to port ${port}...`))
app.use(express.static('client_side'))
app.use(express.json())

let default_colors_list = []

let dbDefaultColors = () => {

    let query = "SELECT * FROM colors_info WHERE color_type = 'default'"

    database.all(query, [], (error, rows) => {
        if(error) return console.error(error.message)

        rows.forEach(row => {
            default_colors_list.push(row)
        })
    })

    database.close(error => {
        if(error) return console.error(error.message)
    })
}

dbDefaultColors()

app.get("/default_colors", (request, response) => {

    response.json(default_colors_list)
})