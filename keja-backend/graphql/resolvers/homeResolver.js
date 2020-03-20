const Home = require("../../models/home");
const User = require("../../models/user");
const { transformHome } = require("../resolvers/merge");

const homeResolver = {
  homes: async () => {
    try {
      const homes = await Home.find();
      return homes.map(home => {
        return transformHome(home);
      });
    } catch (err) {
      throw err;
    }
  },

  addHome: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const newHome = new Home({
      name: args.homeInput.name,
      homeType: args.homeInput.homeType,
      price: +args.homeInput.price,
      // datePosted: new Date(args.homeInput.date)
      creator: req.userId
    });
    let createdHome;
    try {
      // homes.push(newHome);
      const res = await newHome.save();
      createdHome = transformHome(res);
      const creator = await User.findById(req.userId);
      // console.log(res)
      // return {...res._doc};
      if (!creator) {
        throw new Error("User does not exist .");
      }
      creator.createdHomes.push(newHome);
      await creator.save();
      return createdHome;
    } catch (err) {
      throw err;
    }
    // return newHome;
  }
};

module.exports = homeResolver;
