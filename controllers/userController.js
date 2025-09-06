const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

//Get User info
const getUserController = async (req, res) => {
  try {
    //find user
    // const user = await userModel.findById({ _id: req.user.id }, { _id: 0 }); // if we add { _id: 0 } then in response id field wont be visible
    const user = await userModel.findById({ _id: req.user.id });
    //validatiom

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        error,
      });
    }

    //hide pass
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Getting User Info",
      error,
    });
  }
};

//update user info

const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
        user,
      });
    }

    //update

    const { userName, address, phone } = req.body;

    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save the updates
    await user.save();

    res.status(200).send({
      success: true,
      message: "Updates saved successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "User update failed. Please try again.",
      error,
    });
  }
};

//Reset Password

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please provide required fields",
      });
    }
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found or Invalid answer",
      });
    }

    //hashing password
    const salt = bcrypt.genSaltSync(10); // higher the value more storng the password but more time will be required to decrypt
    const hashPassword = await bcrypt.hash(newPassword, salt);

    //save the updates
    user.password = hashPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Reset API",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    //find user

    const user = await userModel.findById({ _id: req.user.id });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // get data  from user

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide required fields",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (isMatch) {
      const salt = bcrypt.genSaltSync(10); // higher the value more storng the password but more time will be required to decrypt
      const hashPassword = await bcrypt.hash(newPassword, salt);

      //save the updates
      user.password = hashPassword;
      await user.save();
    } else {
      return res.status(500).send({
        success: false,
        message: "Incorrect Old Password. Please Try Again",
      });
    }

    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Password update API",
      error,
    });
  }
};

//Delete user account

const deleteProfileController = async (req, res) => {
  try {
    console.log("id hello", req.params.id);
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Your account has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete profile API",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteProfileController,
};
