'use strict'

const service = require('../services')

function isAuth(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(403).send({
			message: `No tienes autentificacion`
		})
	}
	const token = req.headers.authorization.split(" ")[1]
	service.decoded(token)
		.then(response => {
			req.user = response
			next()
		})
		.catch(responce => {
			res.status(response.status)
		})
}

module.exports = isAuth
