const Home = require("../../../../models/home");
const User = require("../../../../models/user");
const { transformHome } = require("../../merge");

// get all homes
const listHomes = async () => {
  try {
    const homes = await Home.find();
    return homes.map((home) => {
      return transformHome(home);
    });
  } catch (err) {
    throw err;
  }
};

// add home ads
const postHome = async (args, req) => {
  if (!req.isAuth) {
    throw new Error("Unauthenticated");
  }
  const newHome = new Home({
    name: args.homeInput.name,
    homeType: args.homeInput.homeType,
    price: +args.homeInput.price,
    creator: req.userId,
  });
  let createdHome;
  try {
    const res = await newHome.save();
    createdHome = transformHome(res);
    const creator = await User.findById(req.userId);
    if (!creator) {
      throw new Error("User does not exist .");
    }
    creator.createdHomes.push(newHome);
    await creator.save();
    return createdHome;
  } catch (err) {
    throw err;
  }
};
module.exports = { listHomes, postHome };
