import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import styles from './ckeditor.module.css'
import axios from 'axios'
export default function Editor(props) {
  const [category, setCategory] = useState([])
  const [question3, setQuestion3] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          'http://18.177.136.227:3002/forum/select/category',
        )
        const res2 = await axios.get(
          'http://18.177.136.227:3002/forum/select/question',
        )
        const data = res.data
        const data2 = res2.data
        await setCategory(data.rows)
        await setQuestion3(data2)
        if (props.editData) {
          props.setTitle(props.editData[0].title)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])
  const falseData = () => {
    props.setTitle('【問題】遇到按鍵卡住bug—在劇情持明龍尊初登場')
    props.setContent(
      '<h1>標題 安安各位好</h1><p>安安</p><p><img src="https://newbookcamp.ngrok.app/img/30.png" alt="" data-href="" style=""/></p><p>哇操</p><p><br></p>',
    )
    props.setQuestion(1)
    props.setQuestion2(1)
  }
  console.log(props.router.query.post != 'post')
  return (
    <>
      <div className='d-flex flex-column w-100 text-white'>
        <div
          className={`d-flex c-bg-purple align-items-center pixel-border-purple mx-1 py-2 px-3 ${styles.postPage}`}
        >
          {props.router.query.status === 'edit' ? (
            <>
              <h5 className='fw-bold'>
                <i className='fa-solid fa-pen-to-square me-3'></i>編輯文章
              </h5>
            </>
          ) : props.router.query.post === 'post' &&
            props.router.query.status === 'add' ? (
            <>
              <h5 className='fw-bold'>
                <i
                  onClick={falseData}
                  className='fa-solid fa-location-arrow me-3'
                ></i>
                發表文章
              </h5>
            </>
          ) : (
            <h5 className='fw-bold'>
              <i className='fa-solid fa-location-arrow me-3'></i>回覆文章
            </h5>
          )}
          <div className={`ms-auto ${styles.postQuestion}`}>
            <select
              className={`${styles.questionSelect} out-time-pixel`}
              onChange={props.onChangeQuestion}
            >
              <option hidden>問題選擇</option>
              {category.map((v, i) => (
                <option
                  key={v.forum_category_id}
                  data={v.forum_category_id}
                  selected={v.forum_category_id === props.data.question}
                >
                  {v.forum_Cname}
                </option>
              ))}
            </select>
            <select
              className={`${styles.questionSelectTwo} out-time-pixel`}
              onChange={props.onChangeQuestion2}
            >
              <option hidden>問題</option>
              {question3.map((v, i) => (
                <option key={i}>{v.question_name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='m-1 my-4'>
          {props.router.query.post === 'post' ? (
            <input
              className='post-input w-100'
              placeholder='請輸入標題...'
              onChange={props.onChangeTitle}
              value={props.title}
            ></input>
          ) : (
            ''
          )}
        </div>
      </div>
      <style jsx>
        {`
          /*發表文章的標題 */
          .post-header {
            background: var(--colorful-purple, #7817f3);
            box-shadow: 7px -7px 0px 0px rgba(0, 0, 0, 1),
              7px 7px 0px 0px rgba(0, 0, 0, 1),
              -7px 7px 0px 0px rgba(0, 0, 0, 1),
              -7px -7px 0px 0px rgba(0, 0, 0, 1);
          }
          /*  標題輸入框 */
          .post-input {
            border-style: none;
            outline: none;
            padding: 1rem;
            background: #0e0e32;
            color: white;
            background: linear-gradient(135deg, transparent 5px, #0e0e32 0) top
                left,
              linear-gradient(-135deg, transparent 5px, #0e0e32 0) top right,
              linear-gradient(-45deg, transparent 5px, #0e0e32 0) bottom right,
              linear-gradient(45deg, transparent 5px, #0e0e32 0) bottom left;
            background-size: 51% 51%;
            background-repeat: no-repeat;
            -webkit-filter: drop-shadow(0px 4px 0 rgba(184, 108, 244, 1))
              drop-shadow(0px -4px 0 rgba(184, 108, 244, 1))
              drop-shadow(4px 0px 0 rgba(184, 108, 244, 1))
              drop-shadow(-4px 0px 0 rgba(184, 108, 244, 1));
          }
           {
            /* 下拉式選單的樣式 */
          }
          
          .toolbar {
            background-color: #f1f1f1;
            color: #333;
            border: 100px solid #ccc;
          }
          
        `}
      </style>
    </>
  )
}
