const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikePostSchema = new Schema({
	likepost_id: {
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
});

module.exports = LikePost = mongoose.model('likepost', LikePostSchema);
