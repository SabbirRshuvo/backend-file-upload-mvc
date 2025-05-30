const {
  getAllProducts,
  createProducst,
  deleteProducts,
  updateProducts,
  searchProducts,
} = require("../controllers/productController");

const express = require("express");

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProducst);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);
router.get("/search", searchProducts);

module.exports = router;
