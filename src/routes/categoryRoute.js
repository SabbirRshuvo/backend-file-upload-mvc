const {
  creteCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const express = require("express");
const router = express.Router();

router.post("/", creteCategory);
router.get("/", getAllCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

module.exports = router;
