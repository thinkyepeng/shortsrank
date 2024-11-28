import { useEffect, useState } from "react"
import { EpisodeType } from "@/types/data"
import { getEpisodesAsync } from '@/api/payment'
import { Link } from "react-router-dom"

export default function EpisodeUnlocked() {
  const [data, setData] = useState([] as EpisodeType[])
  useEffect(() => {
    getEpisodesAsync().then(d => setData(d))
  }, [])
  return (
    <div className="episode-record">
      {data.map((item) => (
        <div className="refill-item text-[#b1b1b1] flex my-1" key={item.id}>
          <div className="flex-1">{item.title}</div>
          <div className="w-[100px] cursor-pointer hover:text-white">
            <Link to={`/player?playlet_id=${item.playlet_id}&video_id=${item.id}`}>Play</Link>
          </div>
        </div>
      ))}
    </div>
  )
}