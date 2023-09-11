import React, { useEffect, useContext } from 'react'
import Swal from 'sweetalert2'
import { CartContext } from '@/hooks/cartContext'
export default function CrediCard() {

    const { orderCH } = CartContext();

    console.log(orderCH);
    useEffect(() => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: '訂購失敗！',
            showConfirmButton: true,
        })
            .then(() => {
                window.location.href = "/"
            })
    }, [])

    return (
        <>

        </>
    )
}
