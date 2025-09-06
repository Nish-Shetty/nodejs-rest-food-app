const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//GET USER || GET

router.get("/getUser", authMiddleware, getUserController);

//UPDATE PROFILE || PUT
router.put("/updateUser", authMiddleware, updateUserController);

//RESET PASSWORD || POST
router.post("/resetPassword", authMiddleware, resetPasswordController);

//Update Password || POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

//Delete user || delete
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
