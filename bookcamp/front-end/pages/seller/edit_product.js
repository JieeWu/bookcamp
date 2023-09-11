// import React, { useState } from 'react'
// import axios from 'axios'
// import Swal from 'sweetalert2'

// export default function Editproduct() {
//   const [file, setFile] = useState(null)

//用不到了

//   const [error, setError] = useState({
//     old_book_title: '',
//     old_book_price: '',
//     old_book_author: '',
//     old_book_count: '',
//     book_language: '',
//     b_genre_id: '',
//   })

//   const validateForm = () => {
//     let errors = {}

//     if (!formData.old_book_title.trim()) {
//       errors.old_book_title = '請輸入書名'
//     }
//     if (!formData.old_book_price) {
//       errors.old_book_price = '請輸入價格'
//     }
//     if (!formData.old_book_author.trim()) {
//       errors.old_book_author = '請輸入作者名稱'
//     }
//     if (!formData.old_book_count || formData.old_book_count === '0') {
//       errors.old_book_count = '請輸入數量'
//     }
//     if (!formData.book_language || formData.book_language === '') {
//       errors.book_language = '請選擇使用時間'
//     }
//     if (!formData.b_genre_id || formData.b_genre_id === '') {
//       errors.b_genre_id = '請選擇分類'
//     }
//     if (formData.old_book_price > 100000) {
//       errors.old_book_price = '價格不能超過100000'
//     }
//     if (formData.old_book_count > 100) {
//       errors.old_book_count = '數量不能超過100'
//     }

//     return errors
//   }

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

    
//     const errors = validateForm()

//     if (Object.keys(errors).length > 0) {
//       setError(errors)

//       // 新增的部分: 使用sweetalert2顯示錯誤訊息
//       let errorMessages = Object.values(errors).join('<br/>')
//       Swal.fire({
//         icon: 'error',
//         title: '填寫錯誤!',
//         confirmButtonText: '知道了',
//         html: errorMessages,
//       })

//       return // 如果有錯誤，則不繼續
//     }

//     try {
//       let uploadedFilename = ''

//       // 上傳圖片
//       if (file) {
//         const formDataForImage = new FormData()
//         formDataForImage.append('file', file)

//         const imageResponse = await axios.post(
//           'http://localhost:3002/oldbookupload',
//           formDataForImage,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           },
//         )
//         uploadedFilename = imageResponse.data.filename
//         console.log('File uploaded successfully:', uploadedFilename)
//       }

//       // 更新 formData
//       const updatedFormData = {
//         ...formData,
//         old_book_img_id: uploadedFilename,
//         // client_id
//         // client_id: authJWT.userData.id
//       }

//       // 提交其他資料
//       const response = await axios.put(
//         `http://localhost:3002/selleroldbook/${old_book_id}`,
//         updatedFormData,
//         {
//           withCredentials: true,
//         },
//       )
//       if (response.status === 200) {
//         console.log('數據保存成功!', response.data)
//       } else {
//         console.error('錯誤', response.data)
//       }
//     } catch (error) {
//       console.error('提交數據時出錯', error)
//     }
//   }
//   const handleValidation = (e) => {
//     const { name, value } = e.target

//     let errorMessage = ''

//     if (!value) {
//       errorMessage = '此欄位是必填的'
//     } else if (name === 'old_book_count' && parseInt(value) > 100) {
//       errorMessage = '數量不能超過100'
//     }

//     setError((prevErrors) => ({
//       ...prevErrors,
//       [name]: errorMessage,
//     }))
//   }

//   //現在時間
//   const sherlfDate = new Date()
//   const formattedSherlfDate = `${
//     sherlfDate.getFullYear() +
//     '-' +
//     ('00' + (sherlfDate.getMonth() + 1)).slice(-2) +
//     '-' +
//     ('00' + sherlfDate.getDate()).slice(-2) +
//     ' ' +
//     ('00' + sherlfDate.getHours()).slice(-2) +
//     ':' +
//     ('00' + sherlfDate.getMinutes()).slice(-2) +
//     ':' +
//     ('00' + sherlfDate.getSeconds()).slice(-2)
//   }`

//   const [formData, setFormData] = useState({
//     old_book_title: '',
//     old_book_price: '',
//     old_book_author: '',
//     old_book_count: '',
//     book_language: '',
//     old_book_blurb: '',
//     book_status_id: 1,
//     sherlf_date: formattedSherlfDate,
//     revise_date: formattedSherlfDate,
//     b_genre_id: '',
//     b_type_id: 2,
//     old_book_img_id: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevState) => ({ ...prevState, [name]: value }))

//     if (name === 'old_book_count') {
//       // Validate quantity
//       if (parseInt(value) > 100) {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: '數量不能超過100',
//         }))
//       } else if (value === '' || parseInt(value) === 0) {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: '此欄位是必填的',
//         }))
//       } else {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: null,
//         }))
//       }
//     } else if (name === 'old_book_price') {
//       // Validate price
//       if (parseInt(value) > 100000) {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: '價格不能超過100000',
//         }))
//       } else if (value === '' || parseInt(value) === 0) {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: '此欄位是必填的',
//         }))
//       } else {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: null,
//         }))
//       }
//     } else {
//       // Validate other fields
//       if (value.trim() === '') {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: '此欄位是必填的',
//         }))
//       } else {
//         setError((prevErrors) => ({
//           ...prevErrors,
//           [name]: null,
//         }))
//       }
//     }
//   }

//   return (
//     <>
//       <h3 className='addname'>編輯商</h3>
//       <div className='add '>
//         <form onSubmit={(e)=>{e.preventDefault(); console.log(1231232);}}>
//           <div className='add2'>
//             <label htmlFor='mybook' className='addodboookname'>
//               書名:
//             </label>
//             <input
//               type='text'
//               placeholder='書名'
//               id='mybook'
//               name='old_book_title'
//               value={formData.old_book_title}
//               onChange={handleChange}
//               onBlur={handleValidation}
//               className='form-control'
//             />
//             <span className='errorname'>{error.old_book_title}</span>
//             <br />
//             <label htmlFor='price' className='addodboookname'>
//               價格:
//             </label>
//             <input
//               type='number'
//               min={1}
//               placeholder='價格'
//               id='price'
//               name='old_book_price'
//               className='form-control'
//               value={formData.old_book_price}
//               onChange={handleChange}
//               onBlur={handleValidation}
//             />
//             <span className='errorname'>{error.old_book_price}</span>
//             <br />
//             <label htmlFor='author' className='addodboookname'>
//               作者:
//             </label>
//             <input
//               type='text'
//               placeholder='作者'
//               id='author'
//               name='old_book_author'
//               className='form-control'
//               value={formData.old_book_author}
//               onChange={handleChange}
//               onBlur={handleValidation}
//             />
//             <span className='errorname'>{error.old_book_author}</span>
//             <br />
//             <label htmlFor='quantity' className='quantity addodboookname'>
//               數量:
//             </label>
//             <input
//               type='number'
//               min={1}
//               placeholder='數量'
//               id='quantity'
//               name='old_book_count'
//               className='form-control'
//               value={formData.old_book_count}
//               onChange={handleChange}
//               onBlur={handleValidation}
//             />
//             <span className='errorname'>{error.old_book_count}</span>
//             <br />
//             <label htmlFor='use' className='addodboookname'>
//               使用多久:
//             </label>
//             <select
//               id='use'
//               className='form-select'
//               name='book_language'
//               value={formData.book_language}
//               onChange={handleChange}
//               onBlur={handleValidation}
//             >
//               <option selected value=''>
//                 請選擇
//               </option>
//               <option value='1'>未拆封</option>
//               <option value='2'>一年內</option>
//               <option value='3'>一年至三年內</option>
//               <option value='4'>三年至五年以</option>
//               <option value='5'>五年以上</option>
//               <option value='6'>不確定</option>
//             </select>
//             <span className='errorname'>{error.book_language}</span>
//             <br />
//             <label htmlFor='myname' className='bookclass addodboookname'>
//               分類:
//             </label>
//             <select
//               id='myname'
//               aria-label='Default select example'
//               className='form-select'
//               name='b_genre_id'
//               value={formData.b_genre_id}
//               onChange={handleChange}
//               onBlur={handleValidation}
//             >
//               <option selected value=''>
//                 請選擇
//               </option>
//               <option value='1'>文學小說</option>
//               <option value='2'>商業理財</option>
//               <option value='3'>藝術設計</option>
//               <option value='4'>人文社科</option>
//               <option value='5'>心理勵志</option>
//               <option value='6'>自然科普</option>
//               <option value='7'>醫療健保</option>
//               <option value='8'>生活與風格</option>
//               <option value='9'>旅遊</option>
//               <option value='10'>輕小說</option>
//               <option value='11'>漫畫/圖文書</option>
//               <option value='12'>語言學習</option>
//               <option value='13'>考試用書</option>
//               <option value='14'>電腦資訊</option>
//               <option value='15'>其他</option>
//             </select>
//             <span className='errorname'>{error.b_genre_id}</span>
//           </div>

//           <div className='push'>
//             <input
//               className='form-check-input'
//               name='book_status_id'
//               type='radio'
//               id='on'
//               value={1} // 上架的值
//               checked={formData.book_status_id == 1}
//               onChange={handleChange}
//             />
//             <label htmlFor='on'>上架</label>
//             <input
//               className='form-check-input'
//               name='book_status_id'
//               type='radio'
//               id='off'
//               value={2} // 下架的值
//               checked={formData.book_status_id == 2}
//               onChange={handleChange}
//             />
//             <label htmlFor='off'>下架</label>
//           </div>

//           <div className='addodboookname'>上傳圖片：</div>
//           <div>
//             <input type='file' onChange={handleFileChange} accept='image/*' />
//           </div>

//           <label htmlFor='describe' className='addodboookname'>
//             簡介:
//           </label>
//           <textarea
//             className='form-control'
//             id='describe'
//             cols={30}
//             rows={8}
//             name='old_book_blurb'
//             value={formData.old_book_blurb}
//             onChange={handleChange}
//           />
//           <button type='submit' className='addstore'>
//               編輯商品
//           </button>
//         </form>
//       </div>
//     </>
//   )
// }
