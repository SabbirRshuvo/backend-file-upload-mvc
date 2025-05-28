const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  createTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

router.get("/", getAllTodos);
router.post("/", createTodos);
router.delete("/:id", deleteTodo);
router.put("/:id", updateTodo);

module.exports = router;
