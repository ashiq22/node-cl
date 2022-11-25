const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema  = new Schema({
	notification_id: {
    type: Number,
    required: true,
    unique: true
  },
	sender_user_id: {
    type: Number,
    required: true
  },
	receiver_user_id: {
    type: Number,
    required: true
  },
	title: String,
	content: String,
	is_read: { type: Boolean, default: false },
	date: { type: Date, default: Date.now }
});

module.exports = Notification = mongoose.model('notification', NotificationSchema );
