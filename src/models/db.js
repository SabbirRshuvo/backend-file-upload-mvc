const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;
let productsCollection;
let categoryCollection;
let usersCollection;
let fileCollection;
let todoCollection;
let ordersCollection;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("backendFIleUpload");
    todoCollection = db.collection("todo");
    usersCollection = db.collection("users");
    productsCollection = db.collection("products");
    categoryCollection = db.collection("category");
    ordersCollection = db.collection("orders");

    fileCollection = db.collection("files");
    console.log("mongodb connected successfully");
  } catch (error) {
    console.error("mongodb connecting errors", error);
    process.exit(1);
  }
}

const getDB = () => db;

const getProductCollection = () => productsCollection;
const getCategoryCollection = () => categoryCollection;

const getTodoCollection = () => todoCollection;

const getUsersCollection = () => usersCollection;

const getFileCollection = () => fileCollection;

const getOrdersCollection = () => ordersCollection;

module.exports = {
  getDB,
  connectDB,
  getProductCollection,
  getCategoryCollection,
  getFileCollection,
  getTodoCollection,
  getUsersCollection,
  getOrdersCollection,
};
