import express from 'express';
import bcrypt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const router = express.Router();

import authenticate from '../../middlewares/jwt.js';
import { verifyUser, getUser } from '../../models/users.js';

import 'dotenv/config.js';
const accessTokenSecret = process.env.JWT_SECRET;

router.get('/private', authenticate, (req, res) => {
  try {
    const user = req.user;
    console.log('user', user);
    return res.json({ message: 'authorized', user });
  } catch (error) {
    console.error('Error private route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

router.get('/check-login', authenticate, (req, res) => {
  try {
    const user = req.user;
    return res.json({ message: 'authorized', user });
  } catch (error) {
    console.error('Error check-login route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);

    const { email, passwd } = req.body;

    const isMember = await verifyUser({ email });

    console.log(isMember);

    if (!isMember) {
      return res.json({ message: 'fail', code: '400' });
    }

    // 會員存在，將會員的資料取出
    const member = await getUser({ email });

    const comparePassword = bcrypt.compareSync(passwd, member.passwd);
    if (!comparePassword) {
      return res.json({ message: 'fail', code: '400' });
    }

    console.log(member);

    // 如果沒必要，member的password資料不應該，也不需要回應給瀏覽器
    delete member.passwd;

     // 產生存取令牌(access token)，其中包含會員資料
    const accessToken = jsonwebtoken.sign({ ...member }, accessTokenSecret, {
      expiresIn: '24h',
    });

    // 使用httpOnly cookie來讓瀏覽器端儲存access token
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.json({
      message: 'success',
      code: '200',
      accessToken,
    });
  } catch (error) {
    console.error('Error login route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

router.post('/logout', authenticate, (req, res) => {
  try {
     // 清除cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.json({ message: 'success', code: '200' });
  } catch (error) {
    console.error('Error logout route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

router.post('/logout-ssl-proxy', authenticate, (req, res) => {
  try {
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.json({ message: 'success', code: '200' });
  } catch (error) {
    console.error('Error logout-ssl-proxy route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

router.get('/:client_id', authenticate, (req, res) => {
  try {
    return res.json(req.user);
  } catch (error) {
    console.error('Error /:client route:', error);
    return res.status(500).json({ message: 'Internal Server Error', code: '500' });
  }
});

export default router;
