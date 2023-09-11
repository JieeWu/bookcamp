
//這段前端已經全部都白寫了 因為不用賣家商場了 
///完全沒屁用了
//RWD也全部都白R了
//:)

// import React, { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import axios from 'axios'
// import Link from 'next/link'
// import dayjs from 'dayjs'
import Store from '@/components/oldbook/PersonalStore/store'
// import StoreRow from '@/components/oldbook/PersonalStore/storeRow'
// import styles from '@/styles/oldbook/odbk-page.module.css'

// export default function PersonalStore() {
//   //二手書的資料
//   const [bookData, setbookData] = useState([])

//   //會員資料
//   const [client, setClient] = useState([])
//   //幾筆
//   const [oldbookCount, setOldbookCount] = useState([])

//   const router = useRouter()
//   //路由參數
//   const { client_id } = router.query
//   useEffect(() => {
//     if (client_id) {
//       const fetchstoreDate = async () => {
//         try {
//           const res = await axios.get(
//             `http://localhost:3002/store/${client_id}`,
//           )
//           //時間格式化

//           setClient(res.data.client)
//           setbookData(res.data.oldbook)
//           setOldbookCount(res.data.oldbookCount)
//         } catch (err) {
//           console.log(err)
//         }
//       }
//       fetchstoreDate()
//     }
//   }, [client_id])

//   return (
//     <>
//       <div className='body-bg'>
//         {/* 個人訊息 */}
        <Store
          client={client}
          bookData={bookData}
          oldbookCount={oldbookCount}
        />
//         {/*賣場 */}
//         <div>
//           <h2 className='bigStore'>賣場</h2>
//         </div>
//         {/*商品排序*/}
//         <StoreRow />

//         <div className='booklist'>
//           {bookData.map((v) => {
//             return (
//               <>
//                 <div
//                   className= 'col-md-3 col-6' 
//                   key={v.client_id}
//                 >
//                 <div className={`${styles.commodityCard} pixel-box--white m-2 my-2`}>
//                   <Link href={'/oldbook/' + v.old_book_id}>
//                     <img
//                       className={styles.commodityImg}
//                       src={`http://localhost:3002/public/img/oldbookimgs/${v.old_book_img_id}`}
//                     />
//                   </Link>
//                   <div className='mt-auto position-relative'>
//                     <button
//                       type='button'
//                       className={`${styles.commodityLove} collect-btn`}
//                     >
//                       <i className='fa-regular fa-heart'></i>
//                     </button>
//                     <h6 className='fw-bold px-2'>{v.old_book_title}</h6>
//                     <div className={styles.priceArea}>
//                       <div className='d-bg-purple text-yellow pixel-d-purple w-100 p-1'>
//                         <i className='bi bi-coin mx-1'></i>
//                         {v.old_book_price}
//                       </div>
//                       <button type='button' className={styles.addButton}>
//                         <i className='fa-solid fa-plus'></i>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//                 </div>
//               </>
//             )
//           })}
//         </div>
//       </div>
//     </>
//   )
// }
