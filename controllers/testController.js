const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1> Test user data</h1>");
    //  res.status(200).send({
    //    success: true,
    //    message: "test User Data API",
    //  });
  } catch (error) {
    console.log("Error in test API is ", error);
  }
};

module.exports = { testUserController };
