const mongoose = require("mongoose");

//schema

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      maxlength: [128, "Password cannot exceed 128 characters"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone no. is required"],
      validate: {
        validator: function (v) {
          return /^\+?[0-9]{10,15}$/.test(v); // allows optional + and 10-15 digits
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },

    usertype: {
      type: String,
      required: [true, "usertype is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/9512/9512683.png",
    },
    answer: {
      type: "String",
      required: ["Answer is required"],
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("User", userSchema);
