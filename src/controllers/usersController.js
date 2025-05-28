const { ObjectId } = require("mongodb");
const { getUsersCollection } = require("../models/db");

const createUsers = async (req, res) => {
  const user = req.body;
  const usersCollection = getUsersCollection();
  const existing = await usersCollection.findOne({ email: user.email });
  if (existing) {
    return res.status(400).send({ message: "user is already exits" });
  }

  try {
    if (Array.isArray(user)) {
      const result = await usersCollection.insertMany(user);

      res.send(result);
    } else if ((typeof user === "object") !== null) {
      const result = await usersCollection.insertOne(user);
      res.send(result);
    }
  } catch (error) {
    console.error("invalid user", error);
  }
};

const getAllUsers = async (req, res) => {
  const users = await getUsersCollection().find().toArray();
  res.send(users);
};

const deleteUser = async (req, res) => {
  const usersCollection = getUsersCollection();
  const { id } = req.params;
  const result = await usersCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};

const updateUser = async (req, res) => {
  const usersCollection = getUsersCollection();

  const { id } = req.params;
  const updatedDoc = req.body;
  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedDoc }
  );

  res.send(result);
};

module.exports = { createUsers, getAllUsers, deleteUser, updateUser };
