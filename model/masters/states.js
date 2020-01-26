const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let States = new Schema({
  name: { type: String },
  country_id: { type: Schema.Types.ObjectId, ref: 'Countries' }
});

module.exports = mongoose.model("States", States);