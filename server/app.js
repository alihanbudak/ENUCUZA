const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const { default: mongoose } = require("mongoose");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

//products routes
const productsRoutes = require("./routes/products");
app.use("/api/product", productsRoutes);

mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
});
mongoose.connection
  .once("open", () => {
    console.log("connected to database");
  })
  .on("error", (error) => {
    console.log("error", error);
  });

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
