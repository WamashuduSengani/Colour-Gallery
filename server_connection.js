const express = require("express")
const app = express()
const port = 5000

app.listen(port, () => console.log(`Connected to port ${port}...`))
app.use(express.static('client_side'))
app.use(express.json())

exports.app = app
