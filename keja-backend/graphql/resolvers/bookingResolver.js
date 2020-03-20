const Home = require("../../models/home");
const Booking = require("../../models/bookings");
const { singleHome, user, transformHome } = require("./merge");

const bookingResolver = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return {
          ...booking._doc,
          _id: booking.id,
          user: user.bind(this, booking._doc.user),
          home: singleHome.bind(this, booking._doc.home)
          // createdAt: new Date(booking._doc.createdAt).toISOString,
          // updatedAt: new Date(booking._doc.updatedAt).toISOString
        };
      });
    } catch (err) {
      throw err;
    }
  },

  bookHome: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const fetchedHome = await Home.findOne({ _id: args.homeId });
    const booking = new Booking({
      user: req.userId,
      home: fetchedHome
    });
    const result = await booking.save();
    return {
      ...result._doc,
      _id: result.id,
      user: user.bind(this, booking._doc.user),
      home: singleHome.bind(this, booking._doc.home)
      //    createdAt: new Date(result._doc.createdAt).toISOString,
      //    updatedAt: new Date(result._doc.updatedAt).toISOString
    };
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    try {
      const abooking = await Booking.findById(args.bookingId).populate("home");
      const home = transformHome(abooking.home);
      await Booking.deleteOne({ _id: args.bookingId });
      return home;
    } catch (err) {
      throw err;
    }
  }
};

module.exports = bookingResolver;
