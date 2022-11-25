const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommunityUserSchema = new Schema({
	communityuser_id: {
    type: Number,
    required: true,
    unique: true
  },
	community_id: {
    type: Number,
    required: true
  },
  user_id: {
		type: Number,
		required: true
	}
});

module.exports = CommunityUser = mongoose.model('communityuser', CommunityUserSchema);
