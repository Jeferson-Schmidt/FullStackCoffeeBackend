const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name must not be empty'],
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    size: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: false
    },
    date: {
        type: Date, 
        default: Date.now()
    }
})

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product