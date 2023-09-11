// const multer = require("multer");
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import fs from 'fs'
const __dirname = dirname(fileURLToPath(import.meta.url));
// const { v4: uuidv4 } = require("uuid");

// 篩選檔案和決定副檔名
const extMap = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
};

const fileFilter = (req, file, callback) => {
  callback(null, !!extMap[file.mimetype]);
};

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, __dirname + "/../public/img");
//   },
//   filename: (req, file, callback) => {
//     const filename = uuidv4() + extMap[file.mimetype];
//     callback(null, filename);
//   },
// });
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __dirname + "/../public/img");
  },
  filename: (req, file, callback) => {
    const files = fs.readdirSync(__dirname + "/../public/img");
    const existingNumbers = files
      .filter(fileName => fileName.match(/^\d+/))
      .map(fileName => parseInt(fileName.match(/^\d+/)[0]));

    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;

    const filename = nextNumber.toString() + extMap[file.mimetype];
    callback(null, filename);
  },
});

export default multer({ fileFilter, storage });
