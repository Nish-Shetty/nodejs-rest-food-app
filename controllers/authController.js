const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, address, phone, email, password, answer, usertype } =
      req.body;
    //validation

    if (!userName || !email || !phone || !password || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    //check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already registered. Please Login",
      });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10); // higher the value more storng the password but more time will be required to decrypt
    const hashPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = await userModel.create({
      userName,
      email,
      phone,
      password: hashPassword,
      address,
      answer,
      usertype,
    });
    res.status(201).send({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Resgister API",
      error,
    });
  }
};

//LOGIN

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide Email or Password fields",
      });
    }

    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "USER NOT FOUND",
      });
    }
    // compare password

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Incorrect Password. Please Try Again",
      });
    }

    //token - can be used to create private/protected route
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined; // we did this so that in postman req password field wont be visible

    res.status(200).send({
      success: true,
      message: "Login Successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
