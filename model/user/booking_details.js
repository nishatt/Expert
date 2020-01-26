const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BookingDetails = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  mentorid: { type: Schema.Types.ObjectId, ref: 'Users' },
  date: { type: String },
  time: { type: String },
  duration: { type: String },
  amount: { type: String },
  orderid: { type: String },
  status: { type: Number },
  payment_status: { type: Number },
  payment_type: { type: Number },
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});

module.exports = mongoose.model("Booking_details", BookingDetails);