import Sidebar from "@/components/sidebar"
import TabsTitle from "@/components/tabs-title"
import RefillRecord from "./components/refill-record"
import EpisodeUnlocked from "./components/episode-unlocked"
import { useState } from "react"
import './user-center.css'

export default function UserCenterPage() {
  const [value, setValue] = useState(0)
  const options = [
    {label: 'Refill Record', value: 'refill'},
    {label: 'Episode Unlocked', value: 'episode'},
  ]
  const handleClick = (evt: any, v:number) => {
    setValue(v)
  }
  return (
    <div className="user-center-1 md:flex px-[10px] md:px-0 pt-[76px] md:pt-[56px]">
      <Sidebar />
      <div className="flex-1 user-center-2">
        <TabsTitle options={options} value={value} onClick={handleClick} />
        {value === 0 && <RefillRecord />}
        {value === 1 && <EpisodeUnlocked />}
      </div>
    </div>
  )
}