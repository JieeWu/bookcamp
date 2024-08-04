import { Accordion } from 'react-bootstrap'
import Link from 'next/link';



export default function OrderList(props) {
    console.log(props.order);
    return (
        <>
            {props.order == '' ?
                <h1 className='text-center'>沒有資料</h1>
                :
                <>
                    <Accordion id="orderDetail">
                        {props.order.map((v) => {
                            return (
                                <>
                                    <Accordion.Item eventKey={v.order_id}>
                                        <div className='order-td-group' key={v.order_id}>
                                            <div className='order-td-check'>
                                                <input type="checkbox" checked={v.checkThisBox} value={v.order_id} onChange={(v) => {
                                                    return props.toggleCheck(v.target.value)
                                                }} />
                                            </div>
                                            <div className='order-td-oid'>
                                                {v.order_id}
                                            </div>
                                            <div className='order-td-uid'>
                                                {v.client_id}
                                            </div>
                                            <div className='order-td-total'>
                                                {v.total}
                                            </div>
                                            <div className='order-td-pay'>
                                                {props.pay.length> 0 ?props.pay[(v.pay_id) - 1].pay_name : undefined}
                                            </div>
                                            <div className='order-td-date'>
                                                {v.order_create_date}
                                            </div>
                                            <div className='order-td-state'>
                                                {props.status.length> 0 ?props.status[(v.order_status_id) - 1].order_status_name: undefined}
                                            </div>
                                            <div className='order-td-other'>
                                                <Accordion.Button eventKey={v.order_id} className="changeOrderDetailIcon">
                                                </Accordion.Button>
                                            </div>

                                        </div>
                                    </Accordion.Item>
                                    <Accordion.Collapse eventKey={v.order_id} className='accordion-collapse collapse'>
                                        <div className="accordion-body">
                                            {/* <!-- 訂單明細 --> */}
                                            <div className="row">
                                                <div className="col-5">
                                                    <p>收貨人姓名：
                                                        {v.consignee}
                                                    </p>
                                                    <p>收貨人電話：
                                                        {v.consignee_phone}
                                                    </p>
                                                    <p>收貨人地址：
                                                        {v.consignee_address}
                                                    </p>
                                                </div>
                                                <div className="col-5">
                                                    <p>配送方式：
                                                        {props.delivery.length>0 ? props.delivery[(v.delivery_id) - 1].delivery_name : undefined }
                                                    </p>
                                                    <p>發票方式：
                                                        {props.receipt.length>0 ?props.receipt[(v.receipt_id) - 1].receipt_name: undefined}
                                                    </p>
                                                    <p>優惠卷：
                                                        {props.coupon.length>0 ?props.coupon[(v.coupon_id) - 1].coupon_name: undefined}
                                                    </p>
                                                </div>
                                                <div className="col-2">
                                                    <div
                                                        className="d-flex justify-content-center align-items-center w-100 h-100">
                                                        <Link className="btn btn-outline-info" href={`order/${v.order_id}`}><i
                                                            className="fa-regular fa-file-lines me-2"></i>查看明細</Link>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </Accordion.Collapse>
                                </>
                            )
                        })}
                    </Accordion>
                    <nav className='order_page'>
                        <ul className="pagination">
                            {Array(props.orderPage.totalPage).fill(1).map((v, i) => {
                                const pageIndex = props.orderPage.page;
                                if (pageIndex < 1 || pageIndex > props.orderPage.totalPage) return;
                                return (
                                    <li className={`page-item`} key={i + 1}>
                                        <Link className='page-link' href={`?page=${i + 1}`}>
                                            {i + 1}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </>
            }
        </>
    )
} 