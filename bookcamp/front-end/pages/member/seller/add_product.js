import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import styles from '@/styles/oldbook/add.module.css'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import { useRouter } from 'next/router';

export default function Addproduct() {
  const router = useRouter();
  const { authJWT } = useAuthJWT()

  if (!authJWT || authJWT.userData.client_level !== "root") {
    return (
      <div className='warning-message'>

      </div>
    );
  }

  //導航
  const [file, setFile] = useState(null)
  const [error, setError] = useState({
    b_title: '',
    book_price: '',
    author: '',
    b_type_id:'',
    book_quantity: '',
    b_language_id: '',
    b_genre_id: '',
  })

  const validateForm = () => {
    let errors = {}

    if (!formData.b_title.trim()) {
      errors.b_title = '請輸入書名'
    }
    if (!formData.book_price) {
      errors.book_price = '請輸入價格'
    }
    if (!formData.isbn) {
      errors.isbn = '請輸入ISBN碼'
    }
    if (!formData.author.trim()) {
      errors.author = '請輸入作者名稱'
    }
    if (!formData.book_quantity || formData.book_quantity === '0') {
      errors.book_quantity = '請輸入數量'
    }
    if (!formData.b_language_id || formData.b_language_id === '') {
      errors.b_language_id = '請選擇語言分類'
    }
    if (!formData.b_genre_id || formData.b_genre_id === '') {
      errors.b_genre_id = '請選擇分類'
    }
    if (formData.book_price > 100000) {
      errors.book_price = '價格不能超過100000'
    }
    if (formData.book_quantity > 10000000000000) {
      errors.book_quantity = '數量不能超過100'
    }
    if (!formData.b_type_id) {
      errors.b_type_id = '請輸入出版商'
    }

    return errors
  }

  const handleValidation = (e) => {
    const { name, value } = e.target

    let errorMessage = ''

    if (!value) {
      errorMessage = '此欄位是必填的'
    } else if (name === 'book_quantity' && parseInt(value) > 10000000000000) {
      errorMessage = '數量不能超過10000000000000'
    }
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }))
  }
  const handleFileChange = (event) => {
    setFile(event.target.files[0])
  }

  //現在時間
  const sherlfDate = new Date()
  const formattedSherlfDate = `${
    sherlfDate.getFullYear() +
    '-' +
    ('00' + (sherlfDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('00' + sherlfDate.getDate()).slice(-2) +
    ' ' +
    ('00' + sherlfDate.getHours()).slice(-2) +
    ':' +
    ('00' + sherlfDate.getMinutes()).slice(-2) +
    ':' +
    ('00' + sherlfDate.getSeconds()).slice(-2)
  }`

  //填寫資料
  const demo = {
    b_title: '名偵探柯南(101)',
    book_price: '90',
    author: '青山剛昌',
    book_quantity: '999',
    b_language_id: '1',
    blurb: '一個被埋在國小的時光膠囊，提示其所在處的…居然是宮野明美留下的暗號柯南與灰原等人決定挑戰這個暗號在知名法式餐廳響起了槍聲柯南追趕被擄走的博士出現在他眼前的風之女神其真實身分是然後與覬覦祕寶的怪盜小子對峙的是安室透',
    b_genre_id: '11',
    sherlf_date: formattedSherlfDate,
    revise_date: formattedSherlfDate,
    b_type_id: '青文出版社',
    book_img_id: '',
    isbn: '9786263405257',
    book_status_id: 2,
  }
  const demodata = ()=>{
    setFormData(demo)
  }

  const [formData, setFormData] = useState({
    b_title: '',
    book_price: '',
    author: '',
    book_quantity: '',
    b_language_id: '',
    blurb: '',
    book_status_id: 1,
    sherlf_date: formattedSherlfDate,
    revise_date: formattedSherlfDate,
    b_genre_id: '',
    b_type_id: '',
    book_img_id: '',
    isbn: '',
  })



  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))

    if (name === 'book_quantity') {
      // Validate quantity
      if (parseInt(value) > 100000000) {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: '數量不能超過100',
        }))
      } else if (value === '' || parseInt(value) === 0) {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: '此欄位是必填的',
        }))
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }))
      }
    } else if (name === 'book_price') {
      // Validate price
      if (parseInt(value) > 100000) {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: '價格不能超過100000',
        }))
      } else if (value === '' || parseInt(value) === 0) {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: '此欄位是必填的',
        }))
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }))
      }
    } else {
      if (value.trim() === '') {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: '此欄位是必填的',
        }))
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: null,
        }))
      }
    }
  }

  //提交
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()

    if (Object.keys(errors).length > 0) {
      setError(errors)
      // 新增的部分: 使用sweetalert2顯示錯誤訊息
      let errorMessages = Object.values(errors).join('<br/>')
      Swal.fire({
        icon: 'error',
        title: '填寫錯誤!',
        confirmButtonText: '知道了',
        html: errorMessages,
      })
      return // 如果有錯誤，則不繼續
    }
    // router.push(`/member/seller/Mycommodity`);
    try {
      let uploadedFilename = ''
      // 上傳圖片
      if (file) {
        const formDataForImage = new FormData()
        formDataForImage.append('file', file)

        const imageResponse = await axios.post(
          'http://localhost:3002/oldbookupload',
          formDataForImage,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        uploadedFilename = imageResponse.data.filename
        console.log('File uploaded successfully:', uploadedFilename)
      }
      // 更新 formData
      const updatedFormData = {
        ...formData,
        book_img_id: uploadedFilename,
      }
      // 提交其他資料
      const response = await axios.post(
        'http://localhost:3002/selleroldbook',
        updatedFormData,

      )
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '新增成功',
          confirmButtonText: '確定',
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(`/member/seller/Mycommodity`);
          }
        });
      } else {
        console.error('錯誤', response.data)
      }
    } catch (error) {
      console.error('提交數據時出錯', error)
    }
  }

  return (
    <>
      <h3 className={styles.addname}>新增商品</h3>

      <div className={styles.add}>
      <button type='button' onClick={demodata}>DEMO</button>
        <form onSubmit={handleSubmit}>
          <div className={styles.add2}>
            <label htmlFor='mybook' className={styles.addodboookname}>
              書名:
            </label>
            <input
              type='text'
              placeholder='書名'
              id='mybook'
              name='b_title'
              value={formData.b_title}
              onChange={handleChange}
              onBlur={handleValidation}
              className='form-control'
            />
            <span className={styles.errorname}>{error.b_title}</span>
            <br />
            <label htmlFor='ISBN' className={styles.addodboookname}>
              ISBN碼
            </label>
            <input
              type='number'
              min={1}
              placeholder='ISBN碼'
              id='ISBN'
              name='isbn'
              value={formData.isbn}
              onChange={handleChange}
              onBlur={handleValidation}
              className='form-control'
            />
            <span className={styles.errorname}>{error.isbn}</span>
            <br />
            <label htmlFor='price' className={styles.addodboookname}>
              價格:
            </label>
            <input
              type='number'
              min={1}
              placeholder='價格'
              id='price'
              name='book_price'
              className='form-control'
              value={formData.book_price}
              onChange={handleChange}
              onBlur={handleValidation}
            />
            <span className={styles.errorname}>{error.book_price}</span>
            <br />
            <label htmlFor='author' className={styles.addodboookname}>
              作者:
            </label>
            <input
              type='text'
              placeholder='作者'
              id='author'
              name='author'
              className='form-control'
              value={formData.author}
              onChange={handleChange}
              onBlur={handleValidation}
            />
            <span className={styles.errorname}>{error.author}</span>
            <br />
            <label htmlFor='quantity' className={`${styles.quantity}
${styles.addodboookname}`}>
              數量:
            </label>
            <input
              type='number'
              min={1}
              placeholder='數量'
              id='quantity'
              name='book_quantity'
              className='form-control'
              value={formData.book_quantity}
              onChange={handleChange}
              onBlur={handleValidation}
            />
            <span className={styles.errorname}>{error.book_quantity}</span>
            <br />
            <label htmlFor='use' className={styles.addodboookname}>
              語言分類:
            </label>
            <select
              id='use'
              defaultValue="1"
              className='form-select'
              name='b_language_id'
              value={formData.b_language_id}
              onChange={handleChange}
              onBlur={handleValidation}
            >
              <option value=''>
                請選擇
              </option>
              <option value='1'>繁體中文</option>
              <option value='2'>英文</option>
              <option value='3'>其他外文</option>
            </select>
            <span className={styles.errorname}>{error.b_language_id}</span>
            <br />

            <label htmlFor='booktype' className={styles.addodboookname}>
              出版商:
            </label>
            <input
              id='booktype'
              type='text'
              placeholder='出版商'
              name='b_type_id'
              className='form-control'
              value={formData.b_type_id}
              onChange={handleChange}
              onBlur={handleValidation}
            />
            <span className={styles.errorname}>{error.b_type_id}</span>
            <br />

            <label htmlFor='myname' className={`${styles.bookclass}
${styles.addodboookname}`}>
              書籍分類:
            </label>
            <select
              id='myname'
              aria-label='Default select example'
              className='form-select'
              name='b_genre_id'
              value={formData.b_genre_id}
              onChange={handleChange}
              onBlur={handleValidation}
            >
              <option selected value=''>
                請選擇
              </option>
              <option value='1'>文學小說</option>
              <option value='2'>商業理財</option>
              <option value='3'>藝術設計</option>
              <option value='4'>人文社科</option>
              <option value='5'>心理勵志</option>
              <option value='6'>自然科普</option>
              <option value='7'>醫療健保</option>
              <option value='8'>生活與風格</option>
              <option value='9'>旅遊</option>
              <option value='10'>輕小說</option>
              <option value='11'>漫畫/圖文書</option>
              <option value='12'>語言學習</option>
              <option value='13'>考試用書</option>
              <option value='14'>電腦資訊</option>
              <option value='15'>其他</option>
            </select>
            <span className={styles.errorname}>{error.b_genre_id}</span>
          </div>

          <div className={styles.push}>
            <input
              className='form-check-input'
              name='book_status_id'
              type='radio'
              id='on'
              value={1} // 上架的值
              checked={formData.book_status_id == 1}
              onChange={handleChange}
            />
            <label htmlFor='on'>上架</label>
            <input
              className='form-check-input'
              name='book_status_id'
              type='radio'
              id='off'
              value={2} // 下架的值
              checked={formData.book_status_id == 2}
              onChange={handleChange}
            />
            <label htmlFor='off'>下架</label>
          </div>

          <div className={styles.addodboookname}>上傳圖片：</div>
          <div>
            <input type='file' onChange={handleFileChange} accept='image/*' />
          </div>

          <label htmlFor='describe' className={styles.addodboookname}>
            簡介:
          </label>
          <textarea
            className='form-control'
            id='describe'
            cols={30}
            rows={8}
            name='blurb'
            value={formData.blurb}
            onChange={handleChange}
          />
          <button type='submit' className={styles.addstore}>
            新增商品
          </button>
        </form>
      </div>
    </>
  )
}