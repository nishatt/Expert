const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userScheme = new Schema({
	fullname: { type: String },
	email: { type: String },
	password: { type: String },
	mobile: { type: Number },
	usertype: { type: Number },
	ext: { type: Number },
	countrycode: { type: String },
	country: { type: String },
	countryid: { type: Schema.Types.ObjectId, ref: 'Countries' },
	stateid: { type: Schema.Types.ObjectId, ref: 'States' },
	cityid: { type: Schema.Types.ObjectId, ref: 'Cities' },
	dob: { type: Date },
	gender: { type: Number },
	hometown: { type: String },
	resume: { type: String },
	photo: { type: String },
	verify: { type: Number },
	status: { type: Number },
	token: { type: String },
	sms_token: { type: Number },
	fcm_token: { type: String },
	socialtype: { type: Number },
	linkedin: { type: String },
}, {
	timestamps: {
		createdAt: true,
		updatedAt: true
	}
});

module.exports = mongoose.model("Users", userScheme);