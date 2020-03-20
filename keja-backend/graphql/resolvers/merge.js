const Home = require("../../models/home");
const User = require("../../models/user");
const homes = async homeIds => {
  try {
    const homes = await Home.find({ _id: { $in: homeIds } });
    return homes.map(home => {
      return transformHome(home);
    });
  } catch (err) {
    throw err;
  }
};

const singleHome = async homeId => {
  console.log("homeId", homeId);
  try {
    const specificHome = await Home.findById(homeId);
    return transformHome(specificHome);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    console.log("buggyuser", user);
    return {
      ...user._doc,
      _id: user.id,
      createdHomes: homes.bind(this, user._doc.createdHomes)
    };
  } catch (err) {
    throw err;
  }
};

const transformHome = home => {
  return {
    ...home._doc,
    _id: home.id,
    creator: user.bind(this, home.creator)
  };
};

// exports.homes = homes;
// exports.user = user;
exports.singleHome = singleHome;
exports.transformHome = transformHome;
