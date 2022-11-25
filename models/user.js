const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	user_id: {
    type: Number,
    required: true,
    unique: true
  },
  name:String,
	password: {type: String,
		required: true},
	role: String,
	email: String,
	picture: String,
	sid: { type:Number,
	unique: true
	},
});

module.exports = User = mongoose.model('user', UserSchema);
