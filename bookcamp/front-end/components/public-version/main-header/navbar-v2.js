import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 取得jwt的會員認證狀態
import Swal from 'sweetalert2'

export default function MainNavbarV2() {
  const [isHovered, setIsHovered] = useState(false)
  const [searchValue, setSearchValue] = useState('') //大搜尋
  const { authJWT, setAuthJWT } = useAuthJWT() // 取得jwt的會員認證狀態

  const router = useRouter()
  const handleMouseEnter = (linkName) => {
    setIsHovered(linkName)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleGenreClick = (genreId) => {
    router.push({
      pathname: '/newbook',
      query: { b_genre_id: genreId },
    })
  }

  //監聽事件 按下Enter 可以搜尋
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      // 使用router.push進行導航
      router.push(`/newbook?query=${encodeURIComponent(searchValue)}`)
    }
  }

  // 請先登入
  const handleLinkClick = (e) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: '請先登入',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/member/login')
      }
    })
  }

  return (
    <>
      <div className='mt--1'>
        <div className='d-none d-md-block navbar-bg-v2'>
          <div className='nav-line-bg'>
            <div className='nav-line-bg-org'></div>
          </div>
          <div className='d-flex justify-content-center'>
            <div className='col-8 d-flex justify-content-between align-items-center'>
              <div className='d-flex w-100'>
                <div className='navbar-link-group-v2'>
                  <Link
                    className='nav-listbtn-bg'
                    onMouseEnter={() => handleMouseEnter('實體書籍')}
                    onMouseLeave={handleMouseLeave}
                    href='/newbook'
                  >
                    實體書籍
                  </Link>
                  <Link
                    className='nav-listbtn-bg'
                    onMouseEnter={() => handleMouseEnter('客服幫助')}
                    onMouseLeave={handleMouseLeave}
                    href='/customerservice'
                  >
                    客服幫助
                  </Link>
                  {authJWT.isAuth !== false ? (
                    <Link
                      className='nav-listbtn-bg'
                      href='/member/coupon/coupon'
                    >
                      好康優惠
                    </Link>
                  ) : (
                    <Link
                      className='nav-listbtn-bg'
                      onClick={(e) => {
                        handleLinkClick(e)
                      }}
                      href='#'
                    >
                      好康優惠
                    </Link>
                  )}
                  <Link className='nav-listbtn-bg' href='/forum'>
                    討論交流
                  </Link>
                </div>
              </div>
              <div className='search-frame mx-3'>
                <input
                  placeholder='找啥書?'
                  type='text'
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Link
                  href={`/newbook?query=${encodeURIComponent(searchValue)}`}
                >
                  <button type='submit'>搜尋</button>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`slide-list ${isHovered === '實體書籍' ? 'd-flex' : ''}`}
            onMouseEnter={() => handleMouseEnter('實體書籍')}
            onMouseLeave={handleMouseLeave}
          >
            <div className='col-10 col-xl-8 d-flex flex-wrap mx-auto'>
              <div className='col-2 list-class-btn '>
                <Link href='/newbook?b_genre_id=1'>文學小說</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=2'>商業理財</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=3'>藝術設計</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=4'>人文社科</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=5'>心理勵志</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=6'>自然科普</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=7'>醫療保健</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=8'>生活風格</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=9'>旅遊</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=10'>輕小說</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=11'>漫畫/圖文書</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=12'>語言學習</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=13'>考試用書</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=14'>電腦資訊</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='/newbook?b_genre_id=15'>其他</Link>
              </div>
            </div>
          </div>
          <div
            className={`slide-list ${isHovered === '客服幫助' ? 'd-flex' : ''}`}
            onMouseEnter={() => handleMouseEnter('客服幫助')}
            onMouseLeave={handleMouseLeave}
          >
            <div className='col-10 col-xl-8 d-flex flex-wrap mx-auto'>
              <div className='col-2 list-class-btn'>
                <Link href='#/'>訂單問題</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='#/'>會員問題</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='#/'>常見問題</Link>
              </div>
              <div className='col-2 list-class-btn'>
                <Link href='#/'>其他問題</Link>
              </div>
            </div>
          </div>
        </div>
        {/* 手機板nav */}
        <div className='d-flex d-md-none justify-content-center d-bg-purple p-2'>
          <button
            className='Mobile-search'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseWidth'
            aria-expanded='false'
          >
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
          <div
            className='collapse collapse-horizontal Mobile-search-area'
            id='collapseWidth'
          >
            <div
              className='card card-body p-2 rounded-5 c-bg-purple'
              style={{ width: '80vw' }}
            >
              <input
                placeholder='找啥書?'
                type='text'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
          <div className='d-flex Mobile-slid-content'>
            <Link href='#/'>活動專區</Link>
            <Link href='#/'>熱銷榜</Link>
            <Link href='#/'>中文書類</Link>
            <Link href='#/'>英文書類</Link>
            <Link href='#/'>討論交流</Link>
          </div>
        </div>
      </div>
    </>
  )
}
