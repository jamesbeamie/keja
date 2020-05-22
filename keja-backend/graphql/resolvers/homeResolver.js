const {
  listHomes,
  postHome,
} = require("./controllers/homeControllers/homeController");

// resolvers
const homeResolver = {
  homes: listHomes,
  addHome: postHome,
};

module.exports = homeResolver;
