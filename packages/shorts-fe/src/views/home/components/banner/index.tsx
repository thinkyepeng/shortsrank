import './banner.css'
import { BannerType } from '@/types/data'
import { Link } from 'react-router-dom'

type BannerProps = {
  data: BannerType,
}
export default function Banner(props: BannerProps) {
  return (
    <>
    <Link to={`/player?playlet_id=${props.data.playlet_id}`} className="banner-1 mt-[92px] md:mt-[56px]">
      <div  className="banner-2">
        <div  className="banner-3">
          <div  className="banner-4">
            <span  className="banner-5">{props.data.playlet.title}</span><span  className="banner-6"
              >{props.data.playlet.intro}</span>
          </div>
        </div>
      </div>
      <div  className="banner-7">
        <img
          alt=""
          src={props.data.image}
          className="banner-8"
        />
        <div  className="banner-9"></div>
      </div>
    </Link>
    </>
  )
}