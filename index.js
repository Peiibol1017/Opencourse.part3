require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :response-time ms  '))

const actualDate = new Date()
const generateRandomId = () => Math.round(Math.random() * 1000000)

app.get('/', (request, response)=>{
    response.send("hello world")
})
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})
app.get('/info', (request, response) => {
    response.send (`<p>Phonebook has info for ${persons.length} people </p> <p>${actualDate}</p>`)
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})
app.post('/api/persons', (request, response) => {
const body = request.body
console.log(body)
if (!body.name || !body.number) {
    return response.status(400).json({
        error:'name missing'
    })
}
else {
const person = new Person({
    id: generateRandomId(),
    name: body.name,
    number: body.number,
})
person.save().then(savedPerson => {
    response.json(savedPerson)
})
morgan.token('content', function (req, res) { return res.person })
app.use(morgan(':method :url :status :response-time ms :content '))

}
})

const PORT= process.env.PORT
app.listen (PORT, () => {
})