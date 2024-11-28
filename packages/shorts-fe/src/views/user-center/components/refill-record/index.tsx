import { useEffect, useState } from "react"
import { PaymentHistoryItemType } from "@/types/data"
import { getHistoryAsync } from '@/api/payment'
import * as dayjs from 'dayjs'

export default function RefillRecord() {
  const [data, setData] = useState([] as PaymentHistoryItemType[])
  useEffect(() => {
    getHistoryAsync().then(d => {
      setData(d.map(x => ({...x, created: dayjs(x.created).format('YYYY-MM-DD HH:mm:ss')})))
    })
  }, [])
  return (
    <div className="refill-record">
      <div className="refill-item text-white hidden md:flex my-1 font-semibold">
        <div className="flex-1">Order Number</div>
        <div className="flex-1">Product Name</div>
        <div className="flex-1">Price</div>
        <div className="flex-1">Coins</div>
        <div className="flex-1">Created</div>
      </div>
      {data.map((item) => (
        <div className="refill-item text-[#b1b1b1] md:flex my-1" key={item.out_order_number}>
          <div className="flex-1"><span className="md:hidden inline-block w-[120px]">Order Number:</span>{item.out_order_number}</div>
          <div className="flex-1"><span className="md:hidden inline-block w-[120px]">Product Name:</span>{item.product_name}</div>
          <div className="flex-1"><span className="md:hidden inline-block w-[120px]">Price:</span>${item.price}</div>
          <div className="flex-1"><span className="md:hidden inline-block w-[120px]">Coins:</span>{item.coins}</div>
          <div className="flex-1"><span className="md:hidden inline-block w-[120px]">Created:</span>{item.created}</div>
        </div>
      ))}
    </div>
  )
}