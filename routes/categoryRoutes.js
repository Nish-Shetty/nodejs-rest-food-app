const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
//CREATE CAT || POST
router.post("/create", authMiddleware, createCategoryController);

//GET all CAT || GET
router.get("/getAll", getAllCategoriesController);

//UPDATE CAT || PUT
router.put("/update/:id", authMiddleware, updateCategoryController);

//DELETE CAT || DELETE
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
