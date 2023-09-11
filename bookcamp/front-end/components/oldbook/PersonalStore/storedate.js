import React from 'react'

export default function Storedate(props) {
  console.log(props.openedDate);
  return (
    <div className="opened">賣家資格開通日期:{props.openedDate}</div>
  )
}
