const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const userAuth = {
  createUser: async (args) => {
    try {
      const available = await User.findOne({ email: args.userInput.email });
      if (available) {
        throw new Error("User exists.");
      }
      const hashedpwd = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        userName: args.userInput.userName,
        email: args.userInput.email,
        password: hashedpwd,
      });
      const result = await user.save();
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },

  login: async ({ email, password }) => {
    const theUser = await User.findOne({ email: email });
    if (!theUser) {
      throw new Error("User does not exist");
    }
    const equalPwd = await bcrypt.compare(password, theUser.password);
    if (!equalPwd) {
      throw new Error("Wrong pwd");
    }
    const userToken = jwt.sign(
      {
        userId: theUser.id,
        email: theUser.email,
      },
      "secretekeyforhashingtoken",
      {
        expiresIn: "1hr",
      }
    );
    return {
      userId: theUser.id,
      token: userToken,
      tokenExpires: 1,
    };
  },
};

module.exports = userAuth;
