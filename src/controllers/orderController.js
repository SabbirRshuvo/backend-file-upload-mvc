const { ObjectId } = require("mongodb");
const {
  getProductCollection,
  getUsersCollection,
  getOrdersCollection,
} = require("../models/db");

const createOrder = async (req, res) => {
  try {
    const usersCollection = getUsersCollection();
    const productsCollection = getProductCollection();
    const ordersCollection = getOrdersCollection();

    const { userId, productId, quantity } = req.body;
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!user || !product) {
      return res.status(404).json({ error: "user or products not found" });
    }

    const totalPrice = quantity * product.price;

    const order = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      quantity,
      totalPrice,
      createdAt: new Date(),
    };
    await ordersCollection.insertOne(order);
    res.status(201).json({ message: "order created successfully" });
  } catch (error) {
    res.status(500).json({ error: "faield to create" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const ordersCollection = getOrdersCollection();
    const orders = await ordersCollection.find().toArray();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "failed to get" });
  }
};

module.exports = { createOrder, getAllOrders };
