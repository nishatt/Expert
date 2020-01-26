const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mentorDetails = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  oldid: { type: Number },
  profiletype: { type: Number },
  profilesubtype: { type: Number },
  fees: { type: String },
  account_no: { type: Number },
  ifsc_code: { type: String },
  shortlistedforcompany: { type: String },
  short_desc: { type: String },
  position: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("mentor_details", mentorDetails);