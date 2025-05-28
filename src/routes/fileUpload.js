const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getFileStracture,
  uploadFile,
  getAllFiles,
} = require("../controllers/fileController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", getFileStracture);
router.post("/", upload.single("myFile"), uploadFile);
router.get("/files", getAllFiles);

module.exports = router;
