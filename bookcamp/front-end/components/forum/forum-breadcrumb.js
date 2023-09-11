import { useRouter } from 'next/router'
import React from 'react'

export default function forumBreadcrumb() {
  const router = useRouter()
  console.log(router.pathname)
  console.log(router.query.status)
  return (
    <>
      <nav className='mt-3 my-4 px-3' aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li
            className='breadcrumb-item active'
            aria-current='page'
            style={{ color: 'white' }}
          >
            討論交流
            <i className='fa-solid fa-caret-right px-2'></i>
            {router.pathname === '/forum/reply/[post_id]' ? (
              <>
                <span>文章</span>
                <i className='fa-solid fa-caret-right px-2'></i>
              </>
            ) : (
              ''
            )}
            {router.pathname === '/forum/post/[post]' &&
            router.query.status === 'add' ? (
              <>
                <span>新增文章</span>
                <i className='fa-solid fa-caret-right px-2'></i>
              </>
            ) : (
              ''
            )}
            {router.pathname === '/forum/post/[post]' &&
            router.query.status === 'edit' ? (
              <>
                <span>編輯文章</span>
                <i className='fa-solid fa-caret-right px-2'></i>
              </>
            ) : (
              ''
            )}
          </li>
        </ol>
      </nav>
      {/* <div className="rectangle"></div> */}
      <style jsx>{`
        .breadcrumb {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          list-style: none;
        }
        li {
          list-style: none;
        }
        .rectangle {
          position: relative;
          width: 417.5px;
          height: 92px;
          background: #b86cf4;

          clip-path: polygon(
            30px 5%,
            100% 5%,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            5px 100%,
            5px 30px
          );
        }
        .rectangle::after {
          content: '';
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          background: #321a66;
          z-index: -1;
          clip-path: polygon(
            20px 0,
            100% 0,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            0 100%,
            0 20px
          );
        }
        .third-layer {
          width: 417.5px;
          height: 92px;
          background: black;
          position: absolute;
          z-index: -3;
          clip-path: polygon(
            30px 5%,
            100% 5%,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            5px 100%,
            5px 3 0px
          );
        }
      `}</style>
    </>
  )
}
