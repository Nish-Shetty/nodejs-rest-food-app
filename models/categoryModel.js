const mongoose = require("mongoose");

//schema

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Category title is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20220628/original/pngtree-food-logo-png-image_8239825.png",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Category", categorySchema);
