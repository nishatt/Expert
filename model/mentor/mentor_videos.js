const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let mentorVideos = new Schema({
  // userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  userid: { type: Schema.Types.ObjectId, ref: 'mentor_details' },
  type: { type: Number },
  question: { type: String },
  answer: { type: String },
  link: { type: String },
  question_type: { type: String },
  status: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("mentor_videos", mentorVideos);