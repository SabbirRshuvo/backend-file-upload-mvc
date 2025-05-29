const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
  getFileStracture,
  uploadFile,
  getAllFiles,
} = require("../controllers/fileController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "media"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("myFile"), uploadFile);
router.get("/", getFileStracture);
router.get("/files", getAllFiles);

module.exports = router;
