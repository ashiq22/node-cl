const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	to: { type: Number, required: true },
	from: { type: Number, required:true },
	body: {
    type: String,
    required: true
  },
	date: { type: Date, default: Date.now }
});

module.exports = Message = mongoose.model('message', MessageSchema);
