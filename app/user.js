const mongoose = require('mongoose');
const bycrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	local: {
		email: String,
		password: String
	},
	facebook: {
		email: String,
		password: String,
		id: String,
		token: String
	},
	twitter: {
		email: String,
		password: String,
		id: String,
		token: String
	},
	google: {
		email: String,
		password: String,
		id: String,
		token: String
	}
});

userSchema.methods.generateHash = function (password) {
	return bycrypt.hashSync(password, bycrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function (password) {
	return bycrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);