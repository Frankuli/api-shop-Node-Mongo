'use strit'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
	name: String,
	picture: String,
	price: {
		type: Number,
		deault: 0
	},
	category: {
		type: String,
		enum: ['computers', 'phones', 'accesories']
	},
	description: String
})
module.exports = mongoose.model('Product', ProductSchema)
