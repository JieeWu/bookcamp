import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Accordion from 'react-bootstrap/Accordion'
import axios from 'axios'
export default function OldbookAcc() {
  const router = useRouter();

  const handleGenreClick = (genreId) => {
    router.push({
      pathname: '/oldbook',
      query: { b_genre_id: genreId }
    });
  };
  return (
    <div className='leftmenu'>
      <h6 className='obh6'>書籍分類</h6>
      <div className='leftmenu1'>
            <ul className='leftulcs'>
              <Accordion>
                {/* <li>
                  <Accordion.Item eventKey='0' className='language1' >
                    <Accordion.Header>使用年份</Accordion.Header>
                    <Accordion.Body  className='language2'>
                      <button href=''>未拆封</button>
                      <hr />
                      <button href=''>一年內</button>
                      <hr />
                      <button href=''>一年至三年</button>
                      <hr />
                      <button href=''>三年至五年</button>
                      <hr />
                      <button href=''>五年以上</button>
                      <hr />
                      <button href=''>未知</button>
                    </Accordion.Body>
                  </Accordion.Item>
                </li> */}
                <li>
                  <Accordion.Item eventKey='1' className='language3'>
                    <Accordion.Header>書籍類別</Accordion.Header>
                    <Accordion.Body className='language2'>
                    <button onClick={() => handleGenreClick('1')}>文學小說</button>
                      <hr />
                      <button onClick={() => handleGenreClick('2')}>商業理財</button>
                      <hr />
                      <button onClick={() => handleGenreClick('3')}>藝術設計</button>
                      <hr />
                      <button onClick={() => handleGenreClick('4')}>人文社科</button>
                      <hr />
                      <button onClick={() => handleGenreClick('5')}>心理勵志</button>
                      <hr />
                      <button onClick={() => handleGenreClick('6')}>自然科普</button>
                      <hr />
                      <button onClick={() => handleGenreClick('7')}>醫療健保</button>
                      <hr />
                      <button onClick={() => handleGenreClick('8')}>生活與風格</button>
                      <hr />
                      <button onClick={() => handleGenreClick('9')}>旅遊</button>
                      <hr />
                      <button onClick={() => handleGenreClick('10')}>輕小說</button>
                      <hr />
                      <button onClick={() => handleGenreClick('11')}>漫畫/圖文書</button>
                      <hr />
                      <button onClick={() => handleGenreClick('12')}>語言學習</button>
                      <hr />
                      <button onClick={() => handleGenreClick('13')}>考試用書</button>
                      <hr />
                      <button onClick={() => handleGenreClick('14')}>電腦資訊</button>
                      <hr />
                      <button onClick={() => handleGenreClick('15')}>其他</button>
                    </Accordion.Body>
                  </Accordion.Item>
                </li>
              </Accordion>
            </ul>
          </div>
        </div>
    
  )
}
