import Banner from './home/components/banner'
import Recommend from './home/components/recommend'
import { useState, useEffect } from 'react'
import { getSectionsAsync } from '@/api/home'
import { BannerType, SectionType } from '@/types/data.d'

export default function HomePage() {
  const [data, setData] = useState<SectionType[]>([])
  const [banner, setBanner] = useState({} as BannerType)
  useEffect(() => {
    getSectionsAsync().then((d) => {
      setData(d.sections)
      setBanner(d.banner)
    })
  }, [])
  return <div className='text-white'>
    {banner.image ? <Banner data={banner} />: null}
    {data.map((item) => (
      <Recommend
        key={item.category.id}
        data={item.playlets}
        title={item.category.title} />  
    ))}
  </div>
}