import { SearchItemType, VideoType } from '@/types/data'
import './search-item.css'
import VideoButton from '@/components/video-button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabsTitle from '@/components/tabs-title'

type SearchItemProps = {
  data: SearchItemType,
}

type ClickType = (evt: React.MouseEvent<HTMLElement>, value:number) => void
type ClickButtonType = (item: VideoType) => void

export default function SearchItem(props: SearchItemProps) {
  const [value, setValue] = useState(props.data.videos.length > 0 ? 0: -1)
  const videos = value > -1 ? props.data.videos[value].videos: []
  const tabOptions = props.data.videos.map(x => ({label: x.label, value: x.label}))
  const navigate = useNavigate()
  const handleClick:ClickType = (evt, v) => {
    setValue(v)
  }
  const onClickButton:ClickButtonType = (item) => {
    navigate(`/player?playlet_id=${item.playlet_id}&video_id=${item.id}`)
  }
  return (
    <div className="flex mb-[0.5rem] px-[10px]">
      <div className="md:w-[242px] w-[25vw]">
        <img src={props.data.cover}
          alt=""
          className="search-item-cover" />
      </div>
      <div className="flex-1 search-item-right">
        <div className='search-item-title'>
          {props.data.title}
        </div>
        <div>
          <p className='search-item-5'>
            {props.data.intro}
          </p>
          <div>
            <TabsTitle options={tabOptions} value={value} onClick={handleClick} />
            <div className='flex flex-wrap'>
              {videos.map((item) => (
                <VideoButton key={item.id} data={item} handleClick={onClickButton} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}