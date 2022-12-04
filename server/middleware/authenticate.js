const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    let token = req.cookies.jwtoken;
    let verifyToken = await jwt.verify(token, process.env.SECRET_KEY);
    let rootUser = await User.findOne({
      _id: verifyToken.id,
      "tokens.token": token,
    });

    if (!rootUser) throw new Error("User not found!!");

    req.rootUser = rootUser;
    req.token = token;
    req.UserID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized!! No Token Found");
    console.log(error);
  }
};

module.exports = authenticate;
