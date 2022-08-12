const { app } = require('./server_connection')
const { db } = require('./database_connection')
const { range } = require('./database_connection')

app.get('/all_colors', (request, response) => {
    
    let colors_list = []
    let reshuffled_list = []
    let query = `SELECT * FROM color_details`
    let statement = db.prepare(query)
    
    statement.each([], (error, rows) => {
        if(error) return console.error(error.message)

        colors_list.push(rows)
    })
    statement.finalize()

    setTimeout(() => {
        
        let colors_list_length = colors_list.length - 1

        for(let i = 0; i <= colors_list_length; i++) {
            
            let item_index = range(i, colors_list_length)
            reshuffled_list.push(colors_list[item_index])
            colors_list.splice(item_index, 1)
            colors_list_length = colors_list.length - 1
            i--
        }

       
    }, 10)
})

app.post('/add_color', (request, response) => {

    const data = request.body
    const {color_name} =  data
    const {color_type} = data
    const {support_bool} = data
    const insertQuery = `INSERT INTO color_details (color_name, color_type) VALUES(?,?)`
    const statment = db.prepare(insertQuery)
    
    if(support_bool) {
        statment.run([color_name, color_type], (error, row) => {
            if(error) return console.error(error.message)

            console.log('The row has been added successfully')
        })
    }
    statment.finalize()
})

app.post('/remove_color', (request, response) => {

    const data = request.body
    const { color_name } =  data
    const { color_type } = data
    console.log(data)

    const insertQuery = `DELETE FROM color_details WHERE color_name = ? AND color_type = ?`
    const statment = db.prepare(insertQuery)

    statment.run([color_name, color_type], (error, row) => {
        if(error) return console.error(error.message)

        response.json(`Successfully deleted color ${color_name}`)
    })
    statment.finalize()

})

const print_table_details = function() {
    const selectQuery = `SELECT * FROM color_details`
    const statment = db.prepare(selectQuery)

    statment.each([], (error, row) => {
        if(error) return console.error(error.message)

        console.log(row)
    })
    statment.finalize()
}

const delete_none_defaults = function() {
    const insertQuery = `DELETE FROM color_details WHERE color_type = 'non-default'`
    const statment = db.prepare(insertQuery)

    statment.run([], (error, row) => {
        if(error) return console.error(error.message)

        console.log("Successfully deleted all 'non-default' rows...")
    })
    statment.finalize()
}
