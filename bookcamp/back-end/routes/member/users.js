import express from 'express'
import dayjs from 'dayjs'
const router = express.Router()
import { updateById } from '../../models/base.js'
import bcrypt from 'bcryptjs'

// 檢查空物件
import { isEmpty } from '../../utils/tool.js'

const userTable = 'client'

import {
  cleanAll,
  createBulkUsers,
  createUser,
  deleteUserById,
  getCount,
  getUser,
  getUserById,
  getUsers,
  updateUser,
  updateUserById,
  verifyUser,
} from '../../models/users.js'

// GET - 得到所有會員資料
router.get('/', async function (req, res, next) {
  try {
    const users = await getUsers()
    return res.json({ message: 'success', code: '200', users })
  } catch (error) {
    console.error('Error GET:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', code: '500' })
  }
})

// GET - 得到單一會員資料
router.get('/:userId', async function (req, res, next) {
  try {
    const user = await getUserById(req.params.userId)
    user.birthday = dayjs(user.birthday).format('YYYY-MM-DD')

    delete user.passwd

    return res.json({ message: 'success', code: '200', user })
  } catch (error) {
    console.error('Error GET:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', code: '500' })
  }
})

// 會員註冊
router.post('/register', async function (req, res, next) {
  try {
    const user = req.body
    user.passwd = await bcrypt.hash(user.passwd, 10)
    user.birthday = dayjs(user.birthday).format('YYYY-MM-DD')
    user.join_date = dayjs(user.join_date).format('YYYY-MM-DD')

    if (isEmpty(user)) {
      return res.json({ message: 'fail', code: '400' })
    }

    const count = await getCount({
      client_name: user.client_name,
      email: user.email,
    })

    if (count) {
      return res.json({ message: 'fail', code: '400' })
    }

    const result = await createUser(user)

    if (!result.insertId) {
      return res.json({ message: 'fail', code: '400' })
    }

    return res.json({
      message: 'success',
      code: '200',
      user: { ...user, id: result.insertId },
    })
  } catch (error) {
    console.error('Error Register:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', code: '500' })
  }
})

// 更新會員資料
router.put('/:userId', async function (req, res, next) {
  try {
    const userId = req.params.userId
    const user = req.body
    user.join_date = dayjs(user.join_date).format('YYYY-MM-DD')
    console.log(userId, user)

    if (!userId || isEmpty(user)) {
      return res.json({ message: 'error', code: '400' })
    }

    const result = await updateUserById(user, userId)
    console.log(result)

    if (!result.affectedRows) {
      return res.json({ message: 'fail', code: '400' })
    }

    return res.json({ message: 'success', code: '200' })
  } catch (error) {
    console.error('Error Put:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', code: '500' })
  }
})

// 重設密碼
router.post('/reset-password/:client_id', async function (req, res, next) {
  try {
    const data = req.body
    const client_id = req.params.client_id
    console.log(data)

    if (!client_id) {
      return res.json({ message: 'error', code: '400' })
    }
    const user = await getUserById(client_id)

    const comparePassword = bcrypt.compareSync(data.oldPassword, user.passwd)
    if (!comparePassword) {
      return res.json({ message: 'fail', code: '400' })
    }

    const passwd = await bcrypt.hash(data.newPassword, 10)
    const result = await updateById(userTable, { passwd }, client_id)
    console.log(result)

    res.json({ message: 'success', code: '200' })
  } catch (error) {
    console.error('Error Reset Password:', error)
    return res
      .status(500)
      .json({ message: 'Internal Server Error', code: '500' })
  }
})

export default router
