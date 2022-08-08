const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const app = express()
const port = 5000

const database = new sqlite3.Database("database.db")

app.listen(port, () => console.log(`Connected to port ${port}...`))
app.use(express.static('client_side'))
app.use(express.json())

app.post("/default_colors", (request, response) => {

    const data = request.body
    console.log(data)

})