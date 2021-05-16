const { Schema, model } = require('mongoose');

const filesSchema = new Schema({
	imgId: String,
	timestamps: true
});

const File = mongoose.model('File', filesSchema);

module.exports = File;

/*
filesSchema.methods.setImgUrl = function setImgUrl (filename) {
	this.imgUrl = `mongodb://localhost:27017/public/${filename}`
}
*/