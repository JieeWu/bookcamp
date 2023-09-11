import express from "express";
import { getUserById } from "../../models/users.js";
import { updateById } from '../../models/base.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img/member/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

const userTable = 'client';

router.get("/:client_id", async function (req, res, next) {
  try {
    const user = await getUserById(req.params.client_id);
    const avatar = user.avatar;
    return res.json({ message: "success", code: "200", avatar });
  } catch (error) {
    console.error('Error get avatar route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

router.post(
  "/:client_id",
  upload.single("avatar"),
  async function (req, res, next) {
    try {
      const client_id = req.params.client_id;
      if (req.file) {
        console.log(req.file);
        const result = await updateById(userTable, { avatar: req.file.filename }, client_id);
        console.log(result);
  
        return res.json({ message: "success", code: "200", avatar: req.file.filename });
      } else {
        console.log("沒有上傳檔案");
        return res.json({ message: "fail", code: "409" });
      }
    } catch (error) {
      console.error('Error upload avatar route:', error);
      return res.status(500).json({ message: 'Internal Server Error', code: '500' });
    }
  }
);

router.delete('/:client_id', async function (req, res, next) {
  try {
    const client_id = req.params.client_id;
    const user = await getUserById(client_id);
    const avatarFileName = user.avatar;
    console.log('檔案名稱',avatarFileName);
    const avatarPath = `/img/member/${avatarFileName}`;
    
    fs.unlinkSync(path.join("public", avatarPath));
    
    return res.json({ message: 'success', code: '200' });
  } catch (error) {
    console.error('Error DELETE avatar route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

export default router;
