'use strict'

const Product = require('../models/product')

function getProduct(req, res) {
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
}

function getProducts(req, res) {
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
}

function updateProduct(req, res) {
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
}

function saveProduct(req, res) {
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
}

function deleteProduct(req, res) {
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
}

module.exports = {
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
	saveProduct
}
