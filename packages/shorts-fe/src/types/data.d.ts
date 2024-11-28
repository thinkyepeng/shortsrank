export type PlayletType = {
  id: number,
  cover: string,
  title: string,
  intro: string,
  price: number,
  episodes: number,
  auto_unlock: number,
}

export type CategoryType = {
  title: string,
  id: number,
}

export type CategoryDataType = {
  cats: CategoryType[],
  playlets: PlayletType[],
  catId: number,
}

export type SectionType = {
  category: {
    title: string,
    id: number,
  },
  playlets: PlayletType[]
}

export type VideoType = {
  id: number,
  free: number,
  num: number,
  title: string,
  playlet_id: number,
  link: string,
}

export type GroupedVideoType = {
  label: string,
  videos: VideoType[],
}

export type SearchItemType = PlayletType & {
  videos: GroupedVideoType[]
}

export type PlayetDetailType = PlayletType & {
  videos: GroupedVideoType[],
  video: VideoType,
  videoId: number,
  tabId: number,
}

export type SearchDataType = {
  total: number,
  page: number,
  pageSize: number,
  rows: SearchItemType[],
}

export type ProductType = {
  id: number,
  coins: number,
  description: string,
  price: number,
  product_name: string,
  product_id: string,
}

export type PaymentType = {
  id: number,
  logo: string,
  payment: string,
  sort: number,
  title: string,
}

export type PaymentInfoType = {
  products: ProductType[],
  productId: number,
  payments: PaymentType[],
  paymentId: number,
}

export type OrderType = {
  product_id: number,
  description: string,
  price: number,
  out_orer_number: number,
  checkout_url: string,
  status: number,
}

export type PaymentHistoryItemType = {
  coins: number,
  product_name: string,
  out_order_number: string,
  price: number,
  created: string,
}

export type EpisodeType = {
  id: number,
  link: string,
  title: string,
  playlet_id: number,
}

export type BannerType = {
  id: number,
  image: string,
  playlet_id: number,
  playlet: PlayletType,
}

export type HomeData = {
  banner: BannerType,
  sections: SectionType[]
}