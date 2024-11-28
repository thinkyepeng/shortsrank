import { useEffect, useState } from 'react'
import Sidebar from '@/components/sidebar'
import cx from 'classnames'
import { getPaymentInfoAsync, createOrderAsync, checkoutOrderAsync } from '@/api/payment'
import './payment.css'
import { PaymentType, ProductType } from '@/types/data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '@/stores/profile'
import { AppDispatch } from '@/stores'
const paypal = require('@/assets/img/paypal.jpeg')
declare var SITE_NAME: any;

export default function PaymentPage() {
  const [products, setProducts] = useState([] as ProductType[])
  const [productId, setProductId] = useState(0)
  const [paymentId, setPaymentId] = useState(0)
  const [payments, setPayments] = useState([] as PaymentType[])
  const [pending, setPending] = useState(false)
  const [query] = useSearchParams()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const onSelect = (id:number) => setProductId(id)
  const selectPayment = (id:number) => setPaymentId(id)
  const onSubmit = () => {
    if (pending) {
      return
    }
    setPending(true)
    const payload = {product_id: productId, payment_id: paymentId}
    createOrderAsync(payload).then(d => {
      window.location.href = d.order.checkout_url
      setPending(false)
    }).catch(err => {
      setPending(false)
    })
  }
  const afterSuccess = () => {
    toast('Refill success', {
      position: 'top-center',
      autoClose: 2500,
      type: 'success'
    })
    navigate('/payment')
    dispatch(getUserInfo);
  }
  const afterFail = () => {
    toast('Refill failed', {
      position: 'top-center',
      autoClose: 2500,
      type: 'warning'
    })
    navigate('/payment')
  }
  useEffect(() => {
    getPaymentInfoAsync().then(d => {
      setProducts(d.products)
      setProductId(d.productId)
      setPaymentId(d.paymentId)
      setPayments(d.payments)
    })
  }, [])
  useEffect(() => {
    const type = query.get('type') || ''
    if (['success', 'fail'].includes(type)) {
      const token = query.get('token')
      if (type === 'success' && token) {
        checkoutOrderAsync({ token }).then(afterSuccess).catch(afterFail)
      } else {
        afterFail()
      }
    }
  }, [])
  return (
    <div className="payment-page-1 md:flex px-[10px] md:px-0 pt-[76px] md:pt-[56px]">
      <Sidebar />
      <div className="flex-1 payment-page-2">
        <div className="payment-1">
          <div  className="payment-2">
            <ul  className="payment-3">
              {products.map((product) => (
              <li className={cx(product.id === productId ? "payment-4": "payment-10")}
                onClick={() => onSelect(product.id)}
                key={product.id}>
                <div  className="payment-5">
                  <span  className="payment-6">{product.coins}</span><span  className="payment-7">Coins</span>
                </div>
                <span  className="payment-8">{product.description}</span><span  className="payment-9">${product.price}</span>
              </li>  
              ))}
            </ul>
            <ol className="payment-40">
              {payments.map((payment) => (
                <li className="payment-41" key={payment.id}>
                  <span className="payment-42">{payment.title}</span>
                  <div className="payment-43">
                    <img
                      src={paypal}
                      alt=""
                      className="payment-44"
                    />
                    {payment.id === paymentId ? 
                    <img className="payment-45" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABuElEQVQ4jaXVT4gPYRjA8c/+SOTAxZ9oTw5O5E8iUQo15eLmwkHuDhz8+R2mVROh5E4uiquSVpQNxWELe5ALWyIbcuBmV6un3l9N08ya8fueppnn/b7P+/Q+z4zM7hqxAEuxD5uxDvP4jDeYwGyR5bULm8TLcBbHMdqw6TRu4HKR5XNtxIdwC6sWOkqJOMHRIssnyi97laATuN9BGqzHk/742JGmjPfjcQdhHTuKLJ8sZ7wED4aUBo8GDwNxnuRdma7Er+yPj52SShFX6juWd5RGMhdwFadL72fiakbGB/9DeilJg1+Vb2uxezG2d5RexPn0fB0na2J29tIOVZ4jw8eaTP8lDdb0UptWifo9xFb8KGV6roU0mO+lYle5i01Juhf9lpkOmIkaT9Z8iM57hW2YwtsO0uBlXLe4v1+xoibgDzbifQfppyLLR6MUv3GtIWgRXuBOS2lwRWlWREl+pnE5DN+KLF+t1NJz6XoNy4HB+vLYfIpjQ4gPF1k+VScObqfxGcO7LR+ihYssv1de0PRripqfSb+mDQ07vMPNIstjCNUK6oiaF6mF92BLav3o0i94jWeNR8JfPThmgfLo69cAAAAASUVORK5CYII=" />:
                    <img onClick={() => selectPayment(payment.id)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAB8ElEQVQ4ja3UT4hNYRjH8Y8/pWRBqevPRNQsrsVLs2FBCo0/pTQRC3ZELKYshLClRhYW2LAgUWrEhmIlsWAmvVKyQKScIil1NfnXq/fUcbtj/t1fnd57nve83/uc5/yeZ1JPT49hNAPbsB4rMT/HGxjAffSHEJ63OjwceDuupf1K7COG0IHJlfgFHAwhNKqA6gNJU3AD1zO0D6swHXOxEFNRRy/eYB8+xBjXDgdOoKfYipuYjUN4mF+/1G+8xFksxhHMSqWJMW5oBb6FZTiJVJ/PLSvfpBDCKXTn6J0Y48wqeCM2pw0cHQ2wqhDCPezJof6/Na3X66lmMdduCX6NBVqr1cp1sCiKdVhdFMWzlPEWTMNp/Bhrtk3qzbcnSnDS5QlCU0kG8Q1dCVzapKXRx6HH8sebk83fLr1WcUWjjeChEvwd89oIrpXgJ9kVtTaBV5TguznQPcKBERVjTK29AF8S+Eo+cLwN2R7O67kEfo/z6MTeCWTbkYdWMkJf6Yr92dhptnaNk/0grztCCF+r062s8UClG0eTaWeM8QUW4WII4bamsZk6ZlP+neZxavHwH2Zy0TG8ysMrQXeXm2miVZXGZvrnS9iVr3d4lNefuVOXNpVsZwjhahXUDE56izUZegDLs4Wa9SkncCaEUPyziT+9kHJott2d3QAAAABJRU5ErkJggg==" />
                    }
                  </div>
                </li>
              ))}
            </ol>
            <div className="payment-56" onClick={onSubmit}>
              {pending ? 'Submitting...': 'Refill'}
            </div>
          </div>
          <span  className="payment-57"></span>
          <div  className="payment-58">
            Tips:<br  className="payment-59" />
            1.{SITE_NAME} has free and paid content for evervone.You decide which content
            to unlock.<br  className="payment-60" />
            2.Coins will be used to unlock paid content.<br
              
              className="payment-61"
            />
            3.Refill coins and bonus are equal value. Recharge does not support
            refund.<br  className="payment-62" />
            4.If you have other problems,please contact us.
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}