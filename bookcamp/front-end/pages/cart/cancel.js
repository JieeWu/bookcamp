import React, { useEffect } from 'react'
import Swal from 'sweetalert2'

export default function Cancel() {
    useEffect(() => {
        Swal
            .fire({
                icon: 'error',
                title: '交易失敗',
                text: '您將返回購物車...',
            })
            .then(() => {
                window.location.href = "/cart"
            })
    },[])
    return (
        <>
            
        </>
    )
}
