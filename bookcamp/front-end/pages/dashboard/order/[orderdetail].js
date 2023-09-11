import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function OrderDetail(props) {
  const router = useRouter();
  return (
    <div> {JSON.stringify(router.query)} </div>
  )
}
