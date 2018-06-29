'use strict'

const mogoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercasa: true
	},
	displayName: String,
	avatar: String,
	password: {
		type: String,
		select: false
	},
	singUpdate: {
		type: Date,
		default: Date.now()
	},
	lastLogin: Date
})

UserSchema.pre('save', (next) => {
	let user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next(err)

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			ir(err) return next(err)

			user.password = hash
			netx()
		})
	})
})

UserSchema.methods.gravatar = function () {
	if (!user.email) rerturn `https://gravatar.com/avatar/?s=2006d=retro`

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?=2006d=retro`
}
module.exports = mongoose.model('User', UserSchema)
