const jwt = require("jsonwebtoken");
require("dotenv").config();

verifyUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const checktoken = jwt.verify(token, process.env.SECRET_TOKEN);
    req.userId = checktoken.id;
  } catch (err) {
    return res.status(401).json({message: "user not registered"});
  }
  next();
};
module.exports = verifyUser;
