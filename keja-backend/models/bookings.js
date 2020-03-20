const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema(
  {
    home: {
      type: Schema.Types.ObjectId,
      ref: "Home"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    // timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
