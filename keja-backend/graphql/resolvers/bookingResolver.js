const {
  listAllBookings,
  bookAHome,
  cancelHomeBooking,
} = require("./controllers/bookingControllers/bookingController");
const bookingResolver = {
  bookings: listAllBookings,

  bookHome: bookAHome,

  cancelBooking: cancelHomeBooking,
};

module.exports = bookingResolver;
