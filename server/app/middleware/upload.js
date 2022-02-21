const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
let path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

module.exports = upload;
