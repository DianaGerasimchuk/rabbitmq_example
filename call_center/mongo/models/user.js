const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fullAddress: {
    type: String,
    required: true
  },
  refUserId: {
    type: String,
    required: true
  },
  flights: [{
    flightRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'flight',
      required: true
    },
    ticketPrice: {
      type: Number,
      require: true
    },
    seatNumber: {
      type: String,
      require: true
    },
    seatType: {
      type: String,
      require: true
    }
  }]
});

const user = mongoose.model('user', userSchema);

module.exports = user;