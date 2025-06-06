require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
// middlewares
app.use(cors());
app.use(express.json());

const { connectDB } = require("./src/models/db");
const productRouter = require("./src/routes/productRoute");
const categoryRouter = require("./src/routes/categoryRoute");

const userRoutes = require("./src/routes/userRoutes");
const todoRoutes = require("./src/routes/todoRoute");
const fileUpload = require("./src/routes/fileUpload");
const orderRoutes = require("./src/routes/orders");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// all routers is here
app.use("/products", productRouter);
app.use("/todos", todoRoutes);
app.use("/users", userRoutes);
app.use("/upload", fileUpload);

app.use("/orders", orderRoutes);

app.use("/category", categoryRouter);
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
