import React from 'react'
import axios from 'axios'

export default function OrderDate(props) {

    const choose = async () => {
        await axios.get(`http://localhost:3002/order`, { params: { search: props.date } })
            .then(res => {
                const newDate1 = res.data.pageOrder.newOrder
                const newDate2 = res.data.pageOrder
                props.setOrder(newDate1)
                props.setOrderPage(newDate2)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="col-3">
                <div className="nes-text is-primary">CreateDate
                </div>
                <div className="d-flex">
                    <div className="nes-field is-inline">
                        <input type="date"
                            value={props.date}
                            className="nes-input is-warning"
                            onChange={(e) => {
                                props.setDate(e.target.value)
                            }} />
                    </div>
                    <button className="nes-btn" onClick={choose}>
                        <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </>
    )
}
