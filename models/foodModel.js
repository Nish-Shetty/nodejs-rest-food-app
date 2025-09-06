const mongoose = require("mongoose");

//schema

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food title is required"],
    },
    description: {
      type: String,
      required: [true, "Food Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food Price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/518/962/png-transparent-fast-food-drink-junk-food-eating-food-icon-food-text-logo-thumbnail.png",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },

    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },

    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Foods", foodSchema);
