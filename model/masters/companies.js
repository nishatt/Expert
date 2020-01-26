const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Companies = new Schema({
  name: { type: String },
  image: { type: String },
  status: { type: Number },
  position: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  versionKey: false
});

module.exports = mongoose.model("Companies", Companies);