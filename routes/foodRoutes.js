const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createFoodController,
  getAllFoodItemsController,
  getSingleFoodItemController,
  getFoodItemByRestaurantController,
  updateFoodItemController,
  deleteFoodItemController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

//routes
//Create Food || POST
router.post("/create", authMiddleware, createFoodController);

//Get All Foods || GET
router.get("/getAll", getAllFoodItemsController);

//Get single food item by id || GET
router.get("/getFoodItem/:id", getSingleFoodItemController);

//Get single food item by restaurant using id || GET
router.get("/getFoodItemByRestaurant/:id", getFoodItemByRestaurantController);

//update food item
router.put("/update/:foodId", authMiddleware, updateFoodItemController);

//delete food item
router.delete("/delete/:foodId", authMiddleware, deleteFoodItemController);

//place order
router.post("/placeOrder", authMiddleware, placeOrderController);

//oder status
router.post(
  "/orderStatus/:orderId",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);
module.exports = router;
