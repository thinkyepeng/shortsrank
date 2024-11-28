import axios from '@/utils/axios';
import { OrderType, PaymentInfoType, PaymentHistoryItemType, EpisodeType } from '@/types/data.d'

export function getPaymentInfoAsync() {
  return axios.get<PaymentInfoType>('/payment/info');
}

export type CreateOrderPayload = {
  product_id: number,
  payment_id: number,
}
export function createOrderAsync(params: CreateOrderPayload) {
  return axios.post<{order: OrderType}>('/payment/create_order', params)
}

export function checkoutOrderAsync(params: any) {
  return axios.get('/payment/success_callback', {params})
}

export function getHistoryAsync() {
  return axios.get<PaymentHistoryItemType[]>('/payment/history')
}

export function getEpisodesAsync() {
  return axios.get<EpisodeType[]>('/payment/episodes')
}