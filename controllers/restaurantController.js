const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and address fields",
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "New Restaurant created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error,
    });
  }
};

//Get all restaurants

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});

    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No Restaurant avaialable",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Restaurant API",
      error,
    });
  }
};

//Get Single Restaurant Info

const getRestaurantController = async (req, res) => {
  try {
    console.log("restaurant id", req.params.id);

    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }

    const restaurant = await restaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found for given id",
      });
    }

    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get Rstaurant API",
      error,
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    console.log("restaurant id", req.params.id);

    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide restaurant id",
      });
    }

    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant API",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController,
};
