const express = require("express");
const router = express.Router();

const {
  createUsers,
  getAllUsers,
  deleteUser,
  updateUser,
} = require("../controllers/usersController");

router.post("/", createUsers);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;
