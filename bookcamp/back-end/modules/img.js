// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");

// // 篩選檔案和決定副檔名
// const extMap = {
//   "image/png": ".png",
//   "image/jpeg": ".jpg",
//   "image/webp": ".webp",
// };

// const fileFilter = (req, file, callback) => {
//   callback(null, !!extMap[file.mimetype]);
// };

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, __dirname + "/../public/img");
//   },
//   filename: (req, file, callback) => {
//     const filename = uuidv4() + extMap[file.mimetype];
//     callback(null, filename);
//   },
// });

// module.exports = multer({ fileFilter, storage });