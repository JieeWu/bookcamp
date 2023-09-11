import React from 'react'
import MemberMiddle from '@/components/member/member-middle'
import styles from '@/styles/oldbook/Customerservice.module.css'
import ChatApp from '@/components/cbot/chat-app'
import { Accordion } from 'react-bootstrap'
import Link from 'next/link'
import Swal from 'sweetalert2'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
export default function Customerservice() {
  return (
    <>
    <div className={styles.cs} >
      <h1 className={styles.QR}>遇到了什麼問題?</h1>
      <div className='row'>
        <div className='col-2 d-none d-md-flex px-0'></div>
        <div className='col-12 col-md-10 col-xl-8'>
          <div className=''>
            <MemberMiddle
              TitleIcon='fa-solid fa-user me-2' // 標題icon
              TitleName='客戶服務' // 標題
              Remark='' // 標題旁備註
              DetailIcon='' // 按鈕icon
              DetailName='' // 按鈕名稱
              TextTitle='' // 內容標題
              Text='' // 內容說明
            >
              {/* 下方放自己頁面的資料 */}

              <div className='col-12 ms-3 mt-5'>
                <div className='row'>
                  <div className='col'></div>
                  <div className={`${styles.bookListBlock} col-2 me-4 `}>
                    <h5
                      className={`${styles.bookListTilte} pixel-font-chinese`}
                    >
                      <i className='fa-solid fa-address-book me-2'></i>
                      訂單問題
                    </h5>
                    <div className='h-80 w-100'>
                      {/* 功能管理區 */}
                      <div className={styles.bookListOptions} id='accordion'>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                        >
                          <Link href='/member/order'>查詢您的訂單</Link>
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '退貨/退款說明',
                              '若要辦理退換貨,請務必在收到商品10日內,至會員專區線上申請退換貨,並將商品連同勾選完成的出貨明細表一併包裝妥善,憑退貨便代碼在48小時內,至7-ELEVEN ibon列印單據後,於櫃檯完成寄件。於收到商品後,會立即為您辦理。',
                              'question',
                            )
                          }}
                        >
                          退貨/換貨說明
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '退款方式',
                              '使用信用卡:退款金額會直接退至會員下此訂單時所使用的信用卡中。退款結果會以E-mail通知,若退款成功,一般可於下一期信用卡帳單看到此退款',
                              '退款方式',
                              '使用LINE Pay:退款金額會退到您原扣款的信用卡中,一般作業時間約需7個工作天,實際款項退回時間仍需視發卡銀行作業而定',

                              'question',
                            )
                          }}
                        >
                          退款說明
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 會員問題 */}
                  <div className={`${styles.bookListBlock} col-2 me-4  `}>
                    <h5
                      className={`${styles.bookListTilte} pixel-font-chinese`}
                    >
                      <i className='fa-solid fa-address-book me-2'></i>
                      會員問題
                    </h5>
                    <div className='h-80 w-100'>
                      {/* 功能管理區 */}
                      <div className={styles.bookListOptions} id='accordion'>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                        >
                          <Link href='/member/update'>更改資料</Link>
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                        >
                          <Link href='member/forget-password'>忘記密碼</Link>
                        </button>
                        <button className={`${styles.bookMainBtn}`}>
                        <Link href='member/order'>消費紀錄</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* 常見問題 */}
                  <div className={`${styles.bookListBlock} col-2 me-4  `}>
                    <h5
                      className={`${styles.bookListTilte} pixel-font-chinese`}
                    >
                      <i className='fa-solid fa-address-book me-2'></i>
                      常見問題
                    </h5>
                    <div className='h-80 w-100'>
                      {/* 功能管理區 */}
                      <div className={styles.bookListOptions} id='accordion'>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '新手上路',
                              '加入會員即可購物',
                              'question',
                            )
                          }}
                        >
                         新手上路
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '購物流程',
                              ' 註冊會員 ->登入 -> 加入購物車 ->付款',
                              'question',
                            )
                          }}
                        >
                          購物流程
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '付款說明',
                              '我們提供信用卡,Linepay,超商繳費等',
                              'question',
                            )
                          }}
                        >
                          付款說明
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className={`${styles.bookListBlock} col-2 me-4  `}>
                    <h5
                      className={`${styles.bookListTilte} pixel-font-chinese`}
                    >
                      <i className='fa-solid fa-address-book me-2'></i>
                      其他問題
                    </h5>
                    <div className='h-80 w-100'>
                      {/* 功能管理區 */}
                      <div className={styles.bookListOptions} id='accordion'>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '優惠卷使用',
                              '可以在達到優惠卷使用條件使用',
                             

                              'question',
                            )
                          }}
                        >
                          優惠卷使用
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '運費',
                              '運費60元。滿3000元則免運費',
                              'question',
                            )
                          }}
                        >
                         運費問題
                        </button>
                        <button
                          className={`${styles.bookMainBtn}`}
                          type='button'
                          onClick={() => {
                            Swal.fire(
                              '點數折抵',
                              '1點=1元台幣',
                              'question',
                            )
                          }}
                        >
                        點數折抵
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 機器人 */}
                  <div className={`${styles.bookListBlock} col-2 me-4`}>
                    <h5
                      className={`${styles.bookListTilte} pixel-font-chinese`}
                    >
                      <i className='fa-solid fa-address-book me-2'></i>
                      呼叫書營人
                    </h5>
                    <div className='h-80 w-100'>
                      {/* 功能管理區 */}
                      <div className={styles.bookListOptions} id='accordion'>
                        <div>&ensp;</div>
                        <div>&ensp;</div>
                        <div>
                          <ChatApp />
                        </div>
                        <div>&ensp;</div>
                      </div>
                    </div>
                  </div>
                  <div className='col'></div>
                </div>
              </div>
            </MemberMiddle>
          </div>
        </div>
        <div className='col d-none d-xl-flex'></div>
      </div>
      </div>
    </>
  )
}
