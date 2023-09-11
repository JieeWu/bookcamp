import React, { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { CartContext } from '@/hooks/cartContext'
// 取用Redux
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setBook } from "@/Redux/action.js";


export default function CartDialogBtn({ pay, errorMessageBtn, Shopping, next, href, outturn, submit }) {
    const router = useRouter();
    const activeStep = router.pathname;

    // 購物車狀態
    const { orderCH } = CartContext();

    //取用Redux
    const dispatch = useDispatch();

    //取用Redux
    const localorder = useSelector((state) => state.order); //當作訂單預設值

    //按下前往購物就存進去local
    const gosave = () => {
        dispatch(setOrder(orderCH))
        dispatch(setBook(orderCH.book))
    }
    return (
        <>
            <div className="cart-next-btn">
                {activeStep === '/cart' ?
                    <Link href="/" className='gobtn1 btn-jump-page' >{Shopping}</Link>
                    :
                    <Link href="/cart" className='gobtn1 btn-jump-page'>{Shopping}</Link>
                }
                {activeStep === '/cart/checkout' ?
                    (pay == '2'
                        ?
                        <button className='gobtn2 btn-jump-page' onClick={(e) => {
                            errorMessageBtn(e); gosave();
                        }} type={submit}>{next}</button>
                        :
                        <div className='gobtn2 btn-jump-page' onClick={(e) => {
                            errorMessageBtn(e); gosave();
                        }}>{next}</div>)
                    :
                    <Link className='gobtn2 btn-jump-page' href={href} onClick={(e) => {(router.asPath == '/cart'? outturn(e) : ''); gosave(); }}><i className="fa-solid fa-caret-right pe-3"></i>{next}</Link>
                }

            </div>

            <style jsx>
                {`
            .gobtn2{
                cursor:pointer;
            }
            `}</style>
        </>
    )
}
