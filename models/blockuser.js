const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockUserSchema = new Schema({
	blockuser_id: {
    type: Number,
    required: true,
    unique: true
  },
	user_id: {
    type: Number,
    required: true
  },
	date: { type: Date, default: Date.now }
});

module.exports = BlockUser = mongoose.model('blockuser', BlockUserSchema);
