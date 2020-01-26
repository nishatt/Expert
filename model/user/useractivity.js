const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userActivity = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  date: { type: Date },
  mentorid: { type: Number },
  videoid: { type: Number },
  date: { type: String },
  duration: { type: String },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("User_activity", userActivity);