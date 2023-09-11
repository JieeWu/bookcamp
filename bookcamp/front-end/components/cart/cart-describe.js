import React, { useState, useEffect } from 'react'
import blackstyles from '@/components/cart/css/cart-black.module.css'
import CartDialogBtn from '@/components/cart/cart-dialog-btn'
import Swal from 'sweetalert2';
export default function CartDescribe({ fee,amount, seeAddItem, check, couponName, usePoint, total, cartCoupon }) {


    // 進度條樣式
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        const dddd = () => {
            if (amount < 3000) {
                return (amount / 3000) * 100;
            } else {
                return (3000 / 3000) * 100;

            }
        };
        setPercentage(dddd)
    }, [amount])

    // 檢查-是否有選擇商品
    const outturn = (e) => {
        if (check.length < 1) {
            e.preventDefault();
            Swal.fire({
                icon: 'error',
                title: '請勾選商品',
            })
        }
    }

    return (
        <>
            <div className={`pixel-font-chinese ${blackstyles.cart_next}`}>
                <div className='frame-line-purple-fill'>
                    <div className={`row ${blackstyles['gprompt-box']}`}>
                        <div className='col-12 col-xxl-2'>
                            <div className={`${blackstyles.progressBar}`}>
                                <div className={`${blackstyles.father}`}>
                                    <div id={`${blackstyles.Son}`} style={{ width: `${percentage}%` }}>
                                        <span className='d-flex justify-content-center'>
                                            {percentage <= 0 ? '' :
                                                `${percentage | 0}%`
                                            }
                                        </span>
                                    </div>
                                </div>
                                {amount > 3000 ?
                                    <div>目前享有<span className={`${blackstyles.redtext}`}>免運</span></div>
                                    :
                                    <div data-bs-toggle="modal" data-bs-target="#add1" onClick={(e) => { seeAddItem(e) }}>
                                        在消費
                                        <span className={`pixel-font2 font-xl ${blackstyles.redtext}`}>{3000 - amount}</span>
                                        元至您的訂單，即可享免運配送，是否前往加購?
                                        <span className='position-relative'>
                                            <span className='durationNext'>
                                                <img src='/img/player.png' className='w-100' />
                                            </span>
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className='col-2 col-xxl-1'></div>
                        <div className={`col-12 col-xxl-7 ${blackstyles.paddingBlack}`}>
                            <div>已選擇
                                <span className={`pixel-font2 font-xl ${blackstyles.redtext}`}>{check.length}</span>樣商品，小計為
                                <span className={`pixel-font2 font-xl ${blackstyles.redtext}`}>{amount}</span>元
                                {cartCoupon.length > 0 ?
                                    <span>，您使用了<span className={`font-l ${blackstyles.cart_coupon_name}`}>{couponName}</span></span>
                                    :
                                    ''
                                }
                                <span>，使用點數<span className={`pixel-font2 font-xl ${blackstyles.redtext}`}>{usePoint}</span>點</span>
                                <span>，運費<span className={`pixel-font2 font-xl ${blackstyles.redtext}`}>{fee}</span>元</span>
                                ，總金額為<span className={`pixel-font2 font-xl ${blackstyles.redtext}`}>{total}</span>元。
                            </div>
                            <CartDialogBtn Shopping="返回購物" next="填寫資料" href1="/" href="/cart/checkout" outturn={outturn} />
                        </div>
                        <div className='col-xxl-2'></div>
                    </div>
                </div>
            </div>


            <style jsx>
                {`

{/* 動畫 */}
.durationNext{
  width:18px;
    position:absolute;
    left:0;
    top:0;
    animation: oxxo 0.7s infinite;
  display:flex;
  align-items:center;
}
@keyframes oxxo{
    from{
        left:0;
    }
    to{
        left:10px;
    }
}

      `}</style>
        </>
    )
}
