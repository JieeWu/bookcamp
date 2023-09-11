import React from 'react'
import page from '@/components/share/commodity/commodity-page.module.css'
export default function Person({ name, job, content, img, theme }) {
    return (
        <>
            <div className='pixel-font-chinese me-4'>
                <div className="col-6 col-md-4 col-xl-3 col-xxl-2">
                    <div className="commodityCard pixel-box--white">
                        <div className='d-flex justify-content-center'>
                            <img src={img} className='img-style' />
                        </div>

                        <div className='d-flex'>
                            <div className='d-flex fw-bold box text-m-purple '>
                                <div className='box-img d-flex align-items-center justify-content-center'>
                                    <img src="/about/star.jpg" className='w-100' />
                                </div>
                                <span className='jobname d-flex align-items-center font-l'>{job}</span>
                            </div>
                            <div className="bookGenreBtnGroup">
                                <span className="pixelBorderYellow col-3 text-nowrap px-2">
                                    {theme}
                                </span>
                            </div>
                        </div>
                        <div>{content}</div>
                        <div className='mt-auto position-relative'>
                            <div className={page.priceArea}>
                                <div className='d-bg-purple text-yellow pixel-d-purple w-100 p-1 text-center'>
                                    {name}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
.commodityCard {
    position:relative;
  width:280px;
  height: 500px;
  padding:5%;
  display: flex;
  background-color: #fff;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.25s ease-in;
}

{/* 光線 */}
.commodityCard::before {
  content: ' ';
  position: absolute;
  background: #fff;
  width: 80px;
  height: 500px;
  top: -5px;
  left: -200px;
  opacity: 0.2;
  transition: all 0.5s ease-out;
  transform: skewX(315deg);
}

{/* 底色 */}
.commodityCard:hover {
  background-color: #17151c;
  box-shadow:
    4px 0 0 #222,
    -4px 0 0 #333,
    0 -4px 0 #333,
    0 4px 0 #222;
  color: white;
  z-index: 3;
  transform: scale(1.07);
}

{/* 光線 */}
.commodityCard:hover:before {
  width: 80px;
  left: 300px;
}

{/* 個人照片 */}
.img-style{
    width: 300px;
    height:300px;
    overflow: hidden;
    border-radius: 30px;
    object-fit: cover; 
}

.box {
              width: 200px;
            }
            .box-img {
              width: 30px;
            }

.jobname {
              padding-left:15px;
              white-space: nowrap;
            }

{/* 主要負責 */}
            .bookGenreBtnGroup {
                color:yellow;
  display: flex;
  justify-content: flex-end;
  padding-block: 1rem;
  overflow: scroll; /* 或者使用 auto */
  width: 100%; /* 確保容器寬度充滿父容器 */
  white-space: nowrap; /* 確保按鈕不換行 */
}

.bookGenreBtnGroup::-webkit-scrollbar {
  display: none;
}

.bookGenreBtnGroup span {
  color: white;
  width: auto;
  margin-inline: 0.75rem;
  font-weight: bold;
  transition: 0.3s;
}

.bookGenreBtnGroup button:hover {
  background-color: var(--main-darkpink);
  scale: 1.05;
}

.pixelBorderYellow {
  background-color: var(--main-colorpurple);
  box-shadow:
    0 0 0 3px var(--main-colorpurple),
    0 6px 0 var(--main-purple),
    6px 0 0 var(--main-purple),
    0 -6px 0 var(--main-colorpurple),
    -6px 0 0 var(--main-colorpurple),
    6px 3px 0 var(--black),
    6px -3px 0 var(--black),
    -6px 3px 0 var(--black),
    -6px -3px 0 var(--black),
    3px 6px 0 var(--black),
    3px -6px 0 var(--black),
    -3px 6px 0 var(--black),
    -3px -6px 0 var(--black),
    9px 0 0 var(--black),
    -9px 0 0 var(--black),
    0 9px 0 var(--black),
    0 -9px 0 var(--black);
  transition: 0.3s;
}

.pixelBorderYellow:hover {
  background-color: var(--main-darkpink);
  box-shadow:
    0 0 0 3px var(--main-darkpink),
    0 6px 0 #d6544b,
    6px 0 0 #d6544b,
    0 -6px 0 var(--main-darkpink),
    -6px 0 0 var(--main-darkpink),
    6px 3px 0 var(--black),
    6px -3px 0 var(--black),
    -6px 3px 0 var(--black),
    -6px -3px 0 var(--black),
    3px 6px 0 var(--black),
    3px -6px 0 var(--black),
    -3px 6px 0 var(--black),
    -3px -6px 0 var(--black),
    9px 0 0 var(--black),
    -9px 0 0 var(--black),
    0 9px 0 var(--black),
    0 -9px 0 var(--black);
}


`}</style>
        </>
    )
}
