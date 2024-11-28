import './recommend.css'
import Card from '@/components/card'
import { PlayletType } from '@/types/data.d'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';

type RecommendProps = {
  title: string,
  data: PlayletType[],
}

export default function Recommend(props: RecommendProps) {
  return (
    <div className="section-1">
      <div className="section-2">
        <div  className="section-3">
          <div  className="section-4">
            <div  className="section-5">{props.title}</div>
            <div className='md:hidden'>
              <Swiper
                spaceBetween={20}
                slidesPerView={3}
              >
                {props.data.map((playlet, key) => (
                  <SwiperSlide key={playlet.id}>
                    <Card data={playlet} sn={key+1} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='hidden md:flex'>
              {props.data.map((playlet, key) => (
                <Card key={playlet.id} data={playlet} sn={key+1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}