const { ObjectId } = require("mongodb");
const { getCategoryCollection } = require("../models/db");

const creteCategory = async (req, res) => {
  try {
    const categoryCollection = getCategoryCollection();
    const category = req.body;
    if (Array.isArray(category)) {
      const result = await categoryCollection.insertMany(category);
      res.send(result);
    } else if ((typeof category === "object") !== null) {
      const result = await categoryCollection.insertOne(category);
      res.send(result);
    }
  } catch (error) {
    res.status(404).send({ message: "invalid category" });
  }
};

const getAllCategory = async (req, res) => {
  const result = await getCategoryCollection().find().toArray();
  res.send(result);
};

const deleteCategory = async (req, res) => {
  const categoryCollection = getCategoryCollection();
  const { id } = req.params;
  const result = await categoryCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
};

const updateCategory = async (req, res) => {
  const categoryCollection = getCategoryCollection();
  const { id } = req.params;
  const updatedCategory = req.body;

  const result = await categoryCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedCategory }
  );

  res.send(result);
};

module.exports = {
  creteCategory,
  getAllCategory,
  deleteCategory,
  updateCategory,
};
