
import React from 'react'
import axios from 'axios'

export default function OrderStatus(props) {
    const updateState = async () => {

        const newState = props.order;
        // 假如這個checkThisBox是true，就覆蓋我的status_id
        newState.forEach((v) => {
            if (v.checkThisBox == true) {
                v.order_status_id = parseInt(props.changeOrderStatus);
            }
        })

        await axios.put(`http://localhost:3002/order`, newState, { headers: { 'Content-Type': 'application/json' } })
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <>
            <div className="col-3">
                <div className="nes-text is-primary">Status</div>
                <div className="d-flex">
                    <div className="nes-select is-warning">
                        <select name="batch_status" id="default_select" onChange={(e) => { props.setChangeOrderStatus(e.target.value) }}>
                            <option disabled selected>選擇更改訂單狀態</option>
                            {props.status.map((v) => {
                                return (
                                    <option value={v.order_status_id} key={v.order_status_id} >
                                        {v.order_status_name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <button className="nes-btn" onClick={updateState}>OK</button>
                </div>
            </div>
        </>
    )
}
