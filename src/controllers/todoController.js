const { ObjectId } = require("mongodb");
const { getTodoCollection } = require("../models/db");

const getAllTodos = async (req, res) => {
  const result = await getTodoCollection().find().toArray();
  res.send(result);
};

const createTodos = async (req, res) => {
  try {
    const todoCollection = getTodoCollection();
    const todos = req.body;

    if (Array.isArray(todos)) {
      const result = await todoCollection.insertMany(todos);
      res.send(result);
    } else if ((typeof todos === "object") !== null) {
      const result = await todoCollection().insertOne(todos);
      res.send(result);
    }
  } catch (error) {
    console.error("invalid todo", error);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const result = await getTodoCollection().deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const updatedDoc = req.body;
  const result = await getTodoCollection().updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedDoc }
  );

  res.send(result);
};

module.exports = { getAllTodos, createTodos, deleteTodo, updateTodo };
