const { ObjectId } = require("mongodb");
const { getProductCollection } = require("../models/db");

const createProducst = async (req, res) => {
  try {
    const productCollection = getProductCollection();
    const products = req.body;
    if (Array.isArray(products)) {
      const result = await productCollection.insertMany(products);
      res.send(result);
    } else if ((typeof products === "object") !== null) {
      const result = await productCollection.insertOne(products);

      res.send(result);
    }
  } catch (error) {
    res.status(400).send({ message: "invalid" });
  }
};

const getAllProducts = async (req, res) => {
  const products = await getProductCollection().find().toArray();
  res.send(products);
};

const deleteProducts = async (req, res) => {
  const productCollection = getProductCollection();
  const { id } = req.params;
  const products = await productCollection.deleteOne({
    _id: new ObjectId(id),
  });
  res.send(products);
};

const updateProducts = async (req, res) => {
  const productCollection = getProductCollection();
  const { id } = req.params;
  const updatedProducts = req.body;

  const result = await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedProducts }
  );
  res.send(result);
};

module.exports = {
  getAllProducts,
  createProducst,
  deleteProducts,
  updateProducts,
};
