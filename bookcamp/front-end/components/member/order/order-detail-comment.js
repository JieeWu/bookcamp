import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styleitem from '@/components/cart/css/cart-item.module.css'
import axios from 'axios'
import styles from '@/styles/oldbook/oldbooklist.module.css'
import styleAct from '@/components/front/front-layout/front-page-header.module.css'
export default function OrderDetailComment({ setRating, setComment, rating, comment }) {
    const router = useRouter();
    const [book, setBook] = useState([]);

    const url = 'http://localhost:3002/img/oldbookimgs/'

    //抓取資料
    useEffect(() => {
        const data = async () => {
            try {
                await axios
                    .get(`http://localhost:3002/member/user-order/comment/${router.query.id}`)
                    .then((res) => {
                        setBook(res.data.detail)
                        setRating(res.data.checkStar[0].book_star)
                        setComment(res.data.checkStar[0].book_assess)
                    }).catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error)
            }
        }
        data()
    }, [])

    return (
        <>
            <div className={`row rounded-4 pixel-font-chinese ${styleitem.modalheader_comment} ${styleitem.modalbody}`}>
                {/* 明細 */}
                <div className='col-12 col-xxl-6'>
                    {book.map((item) => {
                        return (
                            <div className='row'>
                                <div className='col-6 p-4'>
                                    <span className={`${styleitem.detailWidth}`}>
                                        <img src={url + `${item.book_img_id}`} className='w-100' />
                                    </span>
                                </div>
                                <div className='col-6 p-4'>
                                    <div className={styles.odbkcontent}>
                                        <span className={`text-center ${styles.odbkcontent1}`}>書名</span>
                                        <div className='mt-3'>{item.b_title}</div>
                                    </div>

                                    <div className={styles.odbkcontent}>
                                        <span className={`text-center ${styles.odbkcontent1}`}>分類</span>
                                        <div className='mt-3'>{item.b_genre_name}</div>
                                    </div>

                                    <div className={styles.odbkcontent}>
                                        <span className={`text-center ${styles.odbkcontent1}`}>價格</span>
                                        <div className='mt-3'>{item.book_price}元</div>

                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* 評價 */}
                <div className='col-12 col-xxl-6'>
                    <div className='star-box'>
                        <div className={`mb-2 d-flex justify-content-start ${styleAct.titleUl}`}><li>星級評價</li></div>
                        <span className='star-bg'>
                            {Array(5)
                                .fill(1)
                                .map((v, i) => {
                                    // 每個星星的分數
                                    const score = i + 1

                                    return (
                                        <button
                                            key={i}
                                            // 分數小於等於目前評分狀態的星星圖示，全部都要亮起
                                            className={`${score <= rating ? 'on' : 'off'} star_button`}
                                            onClick={() => {
                                                setRating(score)
                                            }}
                                        >
                                            &#9733;
                                        </button>
                                    )
                                })}
                        </span>
                    </div>
                    <div className='star-box'>
                        <div className={`mb-2 d-flex justify-content-start ${styleAct.titleUl}`}><li>評價內容</li></div>
                        <input className="input-box text-black text-start ps-2" onChange={(event) => setComment(event.target.value)} value={comment} />
                    </div>
                </div>
            </div>

            <style jsx>
                {`

                .star-box{
                    padding:20px;
                }

                .star-bg{
                    padding-inline:20px;
                }

                .input-box{
                    max-width: 100%;
    width: 100%;
    height: 40px;
    text-align: center;
    color: var(--white);
    border-radius: 5px;
    background:white;
                }

          .star_button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size:50px;
          }
          .on {
            color: gold;
          }
          .off {
            color: gray;
          }
        `}
            </style>
        </>
    )
}
