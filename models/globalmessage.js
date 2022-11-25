const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GlobalMessageSchema = new Schema({
	from: { 
    type: String,
    required: true
   },
	body: {
    type: String,
    required: true
  },
	date: { type: Date, default: Date.now }
});

module.exports = GlobalMessage = mongoose.model('globalmessage', GlobalMessageSchema);
