const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Sectors = new Schema({
  name: { type: String },
  status: { type: Number },
  position: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("Sectors", Sectors);