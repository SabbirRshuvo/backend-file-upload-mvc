const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let productsCollection;
let categoryCollection;
let fileCollection;

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("backendFIleUpload");
    productsCollection = db.collection("products");
    categoryCollection = db.collection("category");

    fileCollection = db.collection("files");
    console.log("mongodb connected successfully");
    return client.db("fileUploaderDB");
  } catch (error) {
    console.error("mongodb connecting errors", error);
    process.exit(1);
  }
}

function getProductCollection() {
  return productsCollection;
}

function getCategoryCollection() {
  return categoryCollection;
}

function getFileCollection() {
  return fileCollection;
}
module.exports = {
  connectDB,
  getProductCollection,
  getCategoryCollection,
  getFileCollection,
};
