require ('dotenv').config()
const mongoose = require ('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
.then(result => {
    console.log('connected to DB')
})
.catch(error => {
    console.log('error connecting to DB', error.message)
})
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: [true, 'Contact name required'],
    },
    number:{
        type: String,
        minLength: 8,
        validate: {
            validator: function(v){
                return /\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number`
        },
        required: [true, 'Contact phone number required']
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)