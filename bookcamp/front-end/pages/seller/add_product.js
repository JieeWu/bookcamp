// import React, { useState } from 'react'
// import axios from 'axios'

// export default function Addproduct() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };
//用不到了

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       let uploadedFilename = '';

//       // 上傳圖片
//       if (file) {
//         const formDataForImage = new FormData();
//         formDataForImage.append('file', file);

//         const imageResponse = await axios.post(
//           'http://localhost:3002/upload',
//           formDataForImage,
//           {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           }
//         );
//         uploadedFilename = imageResponse.data.filename;
//         console.log('File uploaded successfully:', uploadedFilename);
//       }

//       // 更新 formData
//       const updatedFormData = {
//         ...formData,
//         old_book_img_id: uploadedFilename,
//       };

//       // 提交其他資料
//       const response = await axios.post(
//         'http://localhost:3002/selleroldbook',
//         updatedFormData
//       );
//       if (response.status === 200) {
//         console.log('數據保存成功!', response.data);
//       } else {
//         console.error('錯誤', response.data);
//       }
//     } catch (error) {
//       console.error('提交數據時出錯', error);
//     }
//   };
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
//     b_genre_id: 1,
//     b_type_id: 2,
//     old_book_img_id:'',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevState) => ({ ...prevState, [name]: value }))
//   }
//   return (
//     <>
//       <h3>新增商品</h3>
//       <div className='add '>
//         <form onSubmit={handleSubmit}>
         
//           <div className='add2'>
//             <label htmlFor='mybook'>書名:</label>
//             <input
//               type='text'
//               placeholder='書名'
//               id='mybook'
//               name='old_book_title'
//               value={formData.old_book_title}
//               onChange={handleChange}
//               className='form-control'
//             />
//             <span></span>
//             <br />
//             <label htmlFor='price'>價格:</label>
//             <input
//               type='number'
//               min={0}
//               placeholder='價格'
//               id='price'
//               name='old_book_price'
//               className='form-control'
//               value={formData.old_book_price}
//               onChange={handleChange}
//             />
//             <span></span>
//             <br />
//             <label htmlFor='author'>作者:</label>
//             <input
//               type='text'
//               placeholder='作者'
//               id='author'
//               name='old_book_author'
//               className='form-control'
//               value={formData.old_book_author}
//               onChange={handleChange}
//             />
//             <span></span>
//             <br />
//             <label htmlFor='quantity' className='quantity'>
//               數量:
//             </label>
//             <input
//               type='number'
//               min={0}
//               placeholder='數量'
//               id='quantity'
//               name='old_book_count'
//               className='form-control'
//               value={formData.old_book_count}
//               onChange={handleChange}
//             />
//             <span></span>
//             <br />
//             <label htmlFor='use'>使用多久:</label>
//             <select
//               id='use'
//               className='form-select'
//               name='book_language'
//               value={formData.book_language}
//               onChange={handleChange}
//             >
//               <option value='請選擇'>請選擇</option>
//               <option value='1'>未拆封</option>
//               <option value='2'>一年內</option>
//               <option value='3'>一年至三年內</option>
//               <option value='4'>三年至五年以</option>
//               <option value='5'>五年以上</option>
//               <option value='6'>不確定</option>
//             </select>
//             <span></span>
//             <br />
//             <label htmlFor='myname' className='bookclass'>
//               分類:
//             </label>
//             <select
//               id='myname'
//               aria-label='Default select example'
//               className='form-select'
//               name='b_genre_id'
//               value={formData.b_genre_id}
//               onChange={handleChange}
//             >
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
//           </div>
//           <div className='push'>
//             <input
//               className='form-check-input'
//               name='book_status_id'
//               type='radio'
//               id='on'
//               value={1} // 上架的值
//               checked={formData.book_status_id === 1}
//               onChange={handleChange}
//             />
//             <label htmlFor='on'>上架</label>
//             <input
//               className='form-check-input'
//               name='book_status_id'
//               type='radio'
//               id='off'
//               value={2} // 下架的值
//               checked={formData.book_status_id === 2}
//               onChange={handleChange}
//             />
//             <label htmlFor='off'>下架</label>
//           </div>

//           <div>
//             <input type='file'onChange={handleFileChange} />
//           </div>

//           <label htmlFor='describe'>簡介:</label>
//           <textarea
//             className='form-control'
//             id='describe'
//             cols={30}
//             rows={8}
//             name='old_book_blurb'
//             value={formData.old_book_blurb}
//             onChange={handleChange}
//           />
//            <button type='submit' className='addstore'>
//             儲存
//           </button>
//         </form>
//       </div>
//     </>
//   )
// }
