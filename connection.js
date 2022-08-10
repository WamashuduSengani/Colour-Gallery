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

app.post("/add_color", (request, response) => {

    const data = request.body
    const name = data.color_name
    const type = data.color_type
    const bool = data.support_bool
    console.log(data)
    
    const query = `INSERT INTO colors_info (color_id, color_name, color_type) VALUES (?,?,?)`

    if (bool == true) {

        database.run(query, [8, "pink", "non-default"], error => {
            if (error) return console.error(error.message)
        })

        console.log("Successfully inserted")
    }

    database.close()


})