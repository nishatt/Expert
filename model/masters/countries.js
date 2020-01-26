const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Countries = new Schema({
  sortname: { type: String },
  name: { type: String },
  phoneCode: { type: Number }
});

module.exports = mongoose.model("Countries", Countries);