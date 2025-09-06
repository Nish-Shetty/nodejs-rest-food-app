const express = require("express");

//rest object

const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectdb = require("./config/db");

//dot env configuration

dotenv.config();

//DB connection

connectdb();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => https://localhost:8080

app.use("/api/v1/test", require("./routes/testRoutes"));
//For authentication
app.use("/api/v1/auth", require("./routes/authRoutes"));
//For getting user info
app.use("/api/v1/user", require("./routes/userRoutes"));
//For Restaurant
app.use("/api/v1/restaurant", require("./routes/restaurantRoutes"));
// For Category
app.use("/api/v1/category", require("./routes/categoryRoutes"));
//For food
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/test", (req, res) => {
  return res.status(200).send("<h1> Welcome to yukihira stall api </h1>");
});

//PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

//username / pass
//nishith / HIlNa38rq41ZO5Rs
//username / pass
//test / SNtZesdgYQ2lZkVy
