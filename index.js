'use strit'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Product = require('./models/product')

const app = express()
const port = process.env.PORT || 3000

//middlewares

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(bodyParser.json())

//points

app.get('/api/product', (req, res) => {
	Product.find({}, (err, products) => {
		if (err) return res.status(500).send({
			message: `Error al realizar la peticion ${err} `
		})

		if (!products) return res.status(404).send({
			message: `El pruducto no existe`
		})

		res.status(200).send({
			products: products
		})
	})
})

app.get('/api/product/:productId', (req, res) => {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send({
			message: `Error al realizar la peticion ${err} `
		})

		if (!product) return res.status(404).send({
			message: `El pruducto no existe`
		})

		res.status(200).send({
			product: product
		})
	})
})

app.post('/api/product', (req, res) => {
	console.log('POST /api/product')
	console.log(req.query)

	let product = new Product()
	product.name = req.query.name
	product.picture = req.query.picture
	product.price = req.query.price
	product.category = req.query.category
	product.descrption = req.query.description

	product.save((err, productStored) => {
		if (err) res.status(500).send({
			message: `Error al guardar en la base de datos ${err}`
		})

		res.status(200).send({
			product: productStored
		})

	})
})

app.put('/api/product/:productId', (req, res) => {
	let productId = req.params.productId
	let update = req.query

	Product.findByIdAndUpdate(productId, update, (err, productUpdated) => {
		if (err) return res.status(500).send({
			message: `Error al actualizar el producto ${err}`
		})
		res.status(200).send({
			product: productUpdated
		})
	})
})

app.delete('/api/product/:productId', (req, res) => {
	let productId = req.params.productId

	Product.findById(productId, (err, product) => {
		if (err) return res.status(500).send({
			message: `Error al borrar el producto ${err}`
		})

		if (!product) return res.status(404).send({
			message: `El pruducto no existe`
		})

		product.remove(err => {
			if (err) res.status(500).send({
				message: `Error al borrar el producto ${err}`
			})

			res.status(200).send({
				message: `El objeto ha sido borrado`
			})
		})
	})
})

mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
	if (err) {
		return console.log(`Error al conectar a la base de datos ${err}`)
	}
	console.log('Conexion a la base de datos establecida...')

	app.listen(port, () => {
		console.log(`API REST corriendo en http://localhost:${port}`)
	})

})
