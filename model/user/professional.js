const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userProfessional = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  company: { type: Schema.Types.ObjectId, ref: 'Companies' },
  designation: { type: Schema.Types.ObjectId, ref: 'Designation' },
  ctc: { type: String },
  sector: { type: Schema.Types.ObjectId, ref: 'Sectors' },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  short_desc: { type: String },
  start: { type: String },
  end: { type: String },
  city: { type: String },
  position: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("Professional", userProfessional);