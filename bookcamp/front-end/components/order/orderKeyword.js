import React from 'react'
import axios from 'axios'

export default function OrderKeyword(props) {
    const choose = async () => {
        await axios.get(`http://localhost:3002/order`, { params: { search: props.keyword } })
            .then(res => {
                const newKeyword1 = res.data.pageOrder.newOrder
                const newKeyword2 = res.data.pageOrder
                props.setOrder(newKeyword1)
                props.setOrderPage(newKeyword2)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="col-3">
                <div className="nes-text is-primary">Keyword</div>
                <div className="d-flex">
                    <div className="nes-select is-warning">
                        <select id="keyword" onChange={(e) => {
                            props.setkeyword(e.target.value)
                        }}>
                            <option selected disabled>select</option>
                            <optgroup label="付款方式" id="col1">
                                {props.pay.map((v) => {
                                    return (
                                        <option value={v.pay_name} key={v.pay_id}>
                                            {v.pay_name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                            <optgroup label="配送方式" id="col2">
                                {props.delivery.map((v) => {
                                    return (
                                        <option value={v.delivery_name} key={v.delivery_id}>
                                            {v.delivery_name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                            <optgroup label="發票方式" id="col3">
                                {props.receipt.map((v) => {
                                    return (
                                        <option value={v.receipt_name} key={v.receipt_id}>
                                            {v.receipt_name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                            <optgroup label="顯示狀態" id="col4">
                                {props.status.map((v) => {
                                    return (
                                        <option value={v.order_status_name} key={v.order_status_id}>
                                            {v.order_status_name}
                                        </option>
                                    )
                                })}
                            </optgroup>
                        </select>
                    </div>
                    <button className="nes-btn" onClick={choose}>
                        <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </>
    )
}
