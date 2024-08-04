import React from 'react'
import axios from 'axios'

export default function orderTotal(props) {
    let min = 0, max = 99999
    const test1 = (e) => {
        min = e.target.value
        return min
    }
    const test2 = (e) => {
        max = e.target.value
        return max
    }


    const choose = async () => {
        const totals = [min, max]
        await axios.get(`http://localhost:3002/order`, { params: { search: totals } })
            .then(res => {
                const newTotal1 = res.data.pageOrder.newOrder
                const newTotal2 = res.data.pageOrder
                props.setOrder(newTotal1)
                props.setOrderPage(newTotal2)
            }).catch(error => {
                console.log(error)
            })
    }

    
    return (
        <>
            <div className="col-3">
                <div className="nes-text is-primary">TotalRange</div>

                <div className="text-center d-flex nes-field is-inline">
                    <input type="text" name="minmoney" className="nes-input is-warning w-25" placeholder="min" onChange={test1} />
                    <span className="d-flex align-items-center px-2">-</span>
                    <input type="text" name="maxmoney" className="nes-input is-warning w-25" placeholder="max" onChange={test2} />
                    <button className="nes-btn" onClick={choose}>GO</button>
                </div>
            </div>
        </>
    )
}
