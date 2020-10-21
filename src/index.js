const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://root:example@localhost:27017'
const DB_NAME = process.env.DB_NAME || 'time-logger'

let db

app.use(express.json())

// Open MongoDB Connection
MongoClient.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    // Storing a reference to the database so you can use it later
    db = client.db(DB_NAME)
    console.log(`Connected to MongoDB, Database: ${DB_NAME}`)
  })
  .catch(error => console.error(error))

// Configure routes
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/log', (req, res) => {
  db.collection('time-logs').insertOne(req.body)
    .then(result => {
      res
        .header('location', `/log/${result.insertedId}`)
        .status(201)
        .json({ status: 'success', id: result.insertedId })
    })
    .catch(error => res.status(500).end(error))
})
app.get('/log', (req, res) => {
  db.collection('time-logs').find().toArray()
    .then(results => res.json(results))
    .catch(error => res.status(500).end(error))
})
app.get('/log/:id', (req, res) => {
  db.collection('time-logs').findOne({ _id: ObjectId(req.params.id) })
    .then(results => res.json(results))
    .catch(error => res.status(500).end(error))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))
