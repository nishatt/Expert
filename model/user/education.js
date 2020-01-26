const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserEducation = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  college_name: { type: Schema.Types.ObjectId, ref: 'College' },
  program: { type: Schema.Types.ObjectId, ref: 'Program' },
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  start: { type: String },
  end: { type: String },
  cpi_cgpa: { type: String },
  academic_project: { type: Number },
  leadership_roles: { type: Number },
  extra_curricular: { type: Number },
  otherachieve: { type: String },
  intership: { type: Number },
  position: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("Education", UserEducation);