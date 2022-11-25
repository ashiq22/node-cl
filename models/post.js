const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
	post_id: {
    type: Number,
    required: true,
    unique: true
  },
	user_id: {
    type: Number,
    required: true
  },
	username: String,
	avatar: String,
	community_id: Number,
	title: String,
	content: String,
	picture: String,
	likes: { type: Number, default: 0 },
	date: { type: Date, default: Date.now }
});

module.exports = Post = mongoose.model('post', PostSchema);
