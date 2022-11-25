const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunitySchema = new Schema({
	community_id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
		type: String,
		required: true,
		unique:true
	},
	description: String,
	verification: Boolean
});

module.exports = Community = mongoose.model('community', CommunitySchema);
