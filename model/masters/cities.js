const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Cities = new Schema({
  name: { type: String },
  state_id: { type: Schema.Types.ObjectId, ref: 'States' },
});

module.exports = mongoose.model("Cities", Cities);