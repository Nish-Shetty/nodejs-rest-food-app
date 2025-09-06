const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
//CREATE RESTAURANT || POST
router.post("/create", authMiddleware, createRestaurantController);

//Get all restaurants || GET
router.get("/getAllRestaurant", getAllRestaurantController);

//Get Single restaurant || GET
router.get("/getRestaurant/:id", getRestaurantController);

//delete restaurant || DELETE
router.delete(
  "/deleteRestaurant/:id",
  authMiddleware,
  deleteRestaurantController
);

module.exports = router;
