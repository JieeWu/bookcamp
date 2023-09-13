import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import CkeditorButton from '@/components/forum/ckeditor-button'
import ForumBreadcrumb from '@/components/forum/forum-breadcrumb'
import { useRouter } from 'next/router'
import axios from 'axios'
import MyEditor from '@/components/forum/MyEditor'
const TextEditorWithNoSSR = dynamic(
  () => import('@/components/forum/ckeditor'),
  {
    ssr: false,
  },
)
export default function Test() {
  const router = useRouter()

  const [status, setStatus] = useState('')
  const [data, setData] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [question, setQuestion] = useState('')
  const [question2, setQuestion2] = useState('')
  const [editData, setEditData] = useState('')
  const onChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const onChangeQuestion = (e) => {
    // setQuestion(e.target.value)
    const selectedOption = e.target.options[e.target.selectedIndex]
    const selectedCategoryId = selectedOption.getAttribute('data')

    setQuestion(selectedCategoryId)
  }
  const onChangeQuestion2 = (e) => {
    setQuestion2(e.target.value)
  }
  const onChangeContent = (v) => {
    setContent(v)
  }
  useEffect(() => {
    const { post, status } = router.query
    setStatus({ post, status })
    setData({
      title: title,
      content: content,
      question: question,
      question2: question2,
      forum_id: post,
      status: status,
    })
  }, [title, content, question, question2])
  console.log('rid', router.query.id)
  useEffect(() => {
    if (router.query.status === 'edit') {
      const data = [{ pid: router.query.post }]
      if (router.query.id) {
        data.push({ id: router.query.id })
      } else {
        data.push({ rid: router.query.rid })
      }
      const getForum = async () => {
        await axios
          .post('http://3.113.3.149:3002/forum/getEdit', [data], {
            withCredentials: true,
          })
          .then((res) => {
            // console.log('getData', res.data)
            setTitle(res.data.forum_title)
            setContent(res.data.forum_content)
            setQuestion(res.data.forum_category_id)
            setData({
              title: res.data.forum_title,
              content: res.data.forum_content,
              question: question,
              forum_id: res.data.forum_id,
              status: status.status,
            })
          })
          .catch((error) => console.log(error))
      }
      getForum()
    }
  }, [router.query.status])
  console.log('1', title)
  return (
    <>
      <div className='container'>
        {/* 導覽 */}
        <ForumBreadcrumb />
        <div className='row'>
          <div className='col-xxl-10 col-xl-10 col-12 '>
            {/* wandEditor*/}
            <TextEditorWithNoSSR
              router={router}
              setTitle={setTitle}
              title={title}
              data={data}
              setContent={setContent}
              setQuestion={setQuestion}
              setQuestion2={setQuestion2}
              onChangeQuestion={onChangeQuestion}
              onChangeQuestion2={onChangeQuestion2}
              onChangeTitle={onChangeTitle}
              editData={editData}
            />
            <MyEditor
              onChangeContent={onChangeContent}
              data={data}
              router={router}
            />
          </div>
          <div className='col-xxl-2 col-xl-2 postAd'>
            <CkeditorButton data={data} />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .post-background {
            background: #0e0e32;
            min-height: 564px;
            color: white;
          }
         
        `}
      </style>
    </>
  )
}
