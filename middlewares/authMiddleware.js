//used to secure
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //get token from request
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Un-Authorized User",
          err,
        });
      } else {
        //since in authController we used id for token
        console.log(req.body);
        // req.body.id = decode.id;
        req.user = { id: decode.id };
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Please provide auth token",
      error,
    });
  }
};
