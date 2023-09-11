import Link from 'next/link'
import React from 'react'

export default function Navbar() {
  return (
    <>
      <div className="navbar-bg row">
        <div className="col-2"></div>
        <div className="col-8">
          <div className="navbar-link-group">
            <Link href="/nwebook">實體書籍</Link>
            <a href="#">電子書籍</a>
            <a href="#">二手書籍</a>
            <a href="#">書籍分類</a>
            <a href="http://localhost/forum/">討論交流</a>
            <div className="navbar-search-div">
              <input className="navbar-search-input" placeholder="找好書?" />
              <button className="navbar-search-btn">搜尋</button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-2"></div>

      <style jsx>
        {`
          .navbar-bg {
            background: var(--main-colorpurple);
            background-repeat: no-repeat;
            max-width: 99%;
            max-height: 100%;
            width: 100%;
            box-shadow: 0 5px 0 var(--main-brightpurple),
              0 -5px 0 var(--main-brightpurple),
              5px 0 0 var(--main-brightpurple),
              -5px 0 0 var(--main-brightpurple);
            margin-inline: 10px;
            margin-block: 20px;
          }
          .navbar-link-group {
            height: 80px;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }

          .navbar-search-div {
            position: relative;
          }

          .navbar-search-input {
            border-radius: 20px;
            height: 35px;
            padding-left: 20px;
          }

          .navbar-search-btn {
            position: absolute;
            border-radius: 20px;
            top: 2px;
            right: 2px;
            width: 70px;
            height: 31px;
            font-size: small;
            background-color: var(--main-darkpurple);
            color: white;
          }
          a {
            text-decoration: none;
          }
          a:link {
            color: white;
          }
          /* 已連結過 */
          a:visited {
            color: white;
          }
          /* 滑鼠移至連結 */
          a:hover {
            color: yellow;
          }
          /* 選擇的連結 */
          a:active {
            color: white;
          }
        `}
      </style>
    </>
  )
}
