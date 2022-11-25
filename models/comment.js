const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	comment_id: {
    type: Number,
    required: true,
    unique: true
  },
	post_id: {
    type: Number,
    required: true
  },
	user_id: {
    type: Number,
    required: true
  },
	comment: String,
	date: { type: Date, default: Date.now }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
