const {
  getAllProducts,
  createProducst,
  deleteProducts,
  updateProducts,
} = require("../controllers/productController");

const express = require("express");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProducst);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

module.exports = router;
