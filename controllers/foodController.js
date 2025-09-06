const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide details for required fields",
      });
    }

    const newFood = new foodModel({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    await newFood.save();

    res.status(201).send({
      success: true,
      message: "new Food item created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create food API",
      error,
    });
  }
};

//Get All food items
const getAllFoodItemsController = async (req, res) => {
  try {
    const foodIteams = await foodModel.find({});

    if (!foodIteams) {
      return res.status(404).send({
        success: false,
        message: "No food items available",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: foodIteams.length,
      foodIteams,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get All food items API",
      error,
    });
  }
};

//Get single food item by id

const getSingleFoodItemController = async (req, res) => {
  try {
    const foodItemId = req.params.id;

    if (!foodItemId) {
      return res.status(404).send({
        success: false,
        message: "Please provide food item id",
      });
    }

    const foodItem = await foodModel.findById(foodItemId);

    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: `No food item avaiable with id: '${foodItemId}'`,
      });
    }

    res.status(200).send({
      success: true,
      foodItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food item API",
      error,
    });
  }
};

//get food item by restaurant

const getFoodItemByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide id",
      });
    }

    const foodItem = await foodModel.find({ restaurant: restaurantId });

    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: `No food item avaiable with id: '${foodItemId}'`,
      });
    }

    res.status(200).send({
      success: true,
      message: "Food item based on restaurant",
      foodItem,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get single food item API",
      error,
    });
  }
};

//Update food items

const updateFoodItemController = async (req, res) => {
  try {
    const foodId = req.params.foodId;

    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Provide Food id",
      });
    }

    const foodItem = await foodModel.findById({ _id: foodId });

    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: `Food item not found for id: '${foodId}'`,
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    const updatedFoodItem = await foodModel.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );

    res.status(200).send({
      success: "true",
      message: "Food Item updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update food item API",
      error,
    });
  }
};

const deleteFoodItemController = async (req, res) => {
  try {
    const foodId = req.params.foodId;

    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: "Provide Food id",
      });
    }

    const foodItem = await foodModel.findById({ _id: foodId });

    if (!foodItem) {
      return res.status(404).send({
        success: false,
        message: `Food item not found for id: '${foodId}'`,
      });
    }

    await foodModel.findByIdAndDelete(foodId);

    res.status(200).send({
      success: true,
      message: "Food item Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Food item API",
      error,
    });
  }
};

//Place Order

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please provide cart ",
      });
    }

    let total = 0;

    cart.map((item) => {
      total += item.price;
    });
    console.log("req.user", req.user.id);

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.user.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      error,
    });
  }
};

// change Order status API
const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!orderId) {
      return res.status(404).send({
        success: false,
        message: "Please provide order id",
      });
    }
    console.log("req.body  ", req.body);
    const { status } = req.body;

    if (!status) {
      return res.status(404).send({
        success: false,
        message: "Please provide status",
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Order status updated.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Order Status API",
      error,
    });
  }
};
module.exports = {
  createFoodController,
  getAllFoodItemsController,
  getSingleFoodItemController,
  getFoodItemByRestaurantController,
  updateFoodItemController,
  deleteFoodItemController,
  placeOrderController,
  orderStatusController,
};
