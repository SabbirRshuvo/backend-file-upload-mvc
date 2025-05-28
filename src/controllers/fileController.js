const { getFileCollection } = require("../models/db");

const path = require("path");

const getFileStracture = async (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "../", "views", "file.html"));
};

const uploadFile = async (req, res) => {
  const fileCollection = getFileCollection();
  const file = req.file;
  if (!file) return res.status(400).send("no file uploaded");

  const fileDoc = {
    filename: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    uploadedAt: new Date(),
  };

  await fileCollection.insertOne(fileDoc);
  res.send("file uploaded successfully");
};

const getAllFiles = async (req, res) => {
  const files = await getFileCollection()
    .find({}, { projection: { data: 0 } })
    .toArray();
  res.status(200).json(files);
};

module.exports = { getFileStracture, uploadFile, getAllFiles };
