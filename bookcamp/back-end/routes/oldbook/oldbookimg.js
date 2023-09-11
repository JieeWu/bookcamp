import express from "express";
import path from "path";
import fs from "fs/promises";
import multer from "multer";

const router = express();


//這個是上傳圖片
const UPLOAD_FOLDER = path.join("../back-end/public/img/oldbookimgs");

const storage = multer.diskStorage({
  destination: UPLOAD_FOLDER,
  filename: async (req, file, cb) => {
    try {
      const extension = path.extname(file.originalname);
      const newFileName = await generateUniqueFileName(UPLOAD_FOLDER, extension);
      cb(null, newFileName);
    } catch (error) {
      cb(error);
    }
  },
});

const upload = multer({ storage });

async function generateUniqueFileName(folderPath, extension) {
  try {
    let newFileName = generateRandomString(8) + extension;

    while (await fileExists(path.join(folderPath, newFileName))) {
      newFileName = generateRandomString(8) + extension;
    }

    return newFileName;
  } catch (error) {
    throw error;
  }
}

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file was uploaded.");
    }

    const newFilePath = path.join(UPLOAD_FOLDER, req.file.filename);
    console.log("Uploaded file:", newFilePath);

    res.send({
      message: '檔案成功上傳！',
      filename: req.file.filename
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
