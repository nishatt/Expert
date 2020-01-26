const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userDetails = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  targeted_firm: { type: String },
  targeted_inter_firm: { type: String },
  prefered_sector: { type: String },
  short_desc: { type: String },
  hometown: { type: String },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("User_details", userDetails);