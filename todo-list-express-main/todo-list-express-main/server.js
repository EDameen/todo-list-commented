
// Variable that holds a connection to express
const express = require('express')
const app = express()
// Variable that hold a connection to the MongoDB Client
const MongoClient = require('mongodb').MongoClient
// Port used to connect to local host
const PORT = 2121
// .env config
require('dotenv').config()

// Connection to database
let db,
    // A dadatbase connection string that is strored in the .env file
    dbConnectionStr = process.env.DB_STRING,
    // The database name 'todo'
    dbName = 'todo'

// Connection to the MongoDB CLient using the databaase connection string
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    // .then ensures connection to database
    .then(client => {
        // `Connected to ${dbName} Database` is logged to the console
        console.log(`Connected to ${dbName} Database`)
        // Database name is stored into db
        db = client.db(dbName)
    })

// Sets view engine to ejs
app.set('view engine', 'ejs')
// Middleware for serving static files in the public folder
app.use(express.static('public'))
// Enables body parsing support for body requests
app.use(express.urlencoded({ extended: true }))
// Parses JSON
app.use(express.json())


app.get('/',async (request, response)=>{
    const todoItems = await db.collection('todos').find().toArray()
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

// A post request to the /addTodo route, which adds an item to the todo list
app.post('/addTodo', (request, response) => {
    // Pulls data from the todos collection in the database, then inserts it into the request body
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    // After data makes it's way to the request body, 'Todo Added' is logged. The root route is redirected as a response.
    .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
    // Catches and logs error
    .catch(error => console.error(error))
})

// A put request to the /markComplete route, which updates content that exists on the list
app.put('/markComplete', (request, response) => {
    // Pulls data from the todos collection in the database and puts it into the request body
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        // When an item in the list is clicked on, completed is set to true
        $set: {
            completed: true
          }
    },{
        // Sorts through id in descending order
        sort: {_id: -1},
        upsert: false
    })
    // If an item is marked as complete, 'Marked Complete' log to the console. The server will also respond with 'Marked Complete' as JSON
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    // Catches and logs error
    .catch(error => console.error(error))

})

// A put request to the /markComplete route, which updates content that exists on the list
app.put('/markUnComplete', (request, response) => {
    // Pulls data from the todos collection in the database and puts it into the request body
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        // Items completed will be set to false if uncompleted
        $set: {
            completed: false
          }
    },{
        // Sorts through id in descending order
        sort: {_id: -1},
        upsert: false
    })
    // If an item is marked as uncomplete, 'Marked Complete' log to the console. The server will also respond with 'Marked Complete' as JSON
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
    // Catches and logs error
    .catch(error => console.error(error))

})

// A delete request is made through the /deletItem route, deleting selected items
app.delete('/deleteItem', (request, response) => {
    // Pulls data from the todos db collection and puts it into the request body
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
    // When an item is deleted, 'Todo Deleted' gets logged to the console. The server will respond with 'Todo Deleted' as JSON
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
    // Catches and logs error
    .catch(error => console.error(error))

})

// Server listens to port
app.listen(process.env.PORT || PORT, ()=>{
    // Console log ensures server is connected to port
    console.log(`Server running on port ${PORT}`)
})