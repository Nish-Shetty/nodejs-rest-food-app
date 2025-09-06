const categoryModel = require("../models/categoryModel");

//create category
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide category title",
      });
    }

    const newCategory = new categoryModel({
      title,
      imageUrl,
    });

    await newCategory.save();

    res.status(200).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create category API",
      error,
    });
  }
};

// get all categories

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No categories found",
      });
    }

    res.status(200).send({
      success: true,
      totalCount: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get ALL Categories API",
      error,
    });
  }
};

//update category

const updateCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;
    const category = await categoryModel.findById(categoryID);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    console.log("category", category);

    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      categoryID,
      { title, imageUrl },
      { new: true }
    );

    res.status(200).send({
      success: "true",
      message: "Category updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update category API",
      error,
    });
  }
};

//Delete category by id

const deleteCategoryController = async (req, res) => {
  try {
    const categoryID = req.params.id;

    if (!categoryID) {
      return res.status(500).send({
        success: false,
        message: "Please provide category id",
      });
    }
    const category = await categoryModel.findById(categoryID);

    if (!category) {
      return res.status(404).send({
        success: false,
        message: `No Category found with id: '${categoryID}'`,
      });
    }

    await categoryModel.findByIdAndDelete(categoryID);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in delete category API",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};
