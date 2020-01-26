const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let College = new Schema({
  name: { type: String },
  status: { type: Number },
  position: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("College", College);