import { PropsWithChildren } from 'react'
import './player-select.css'

export type PlayerSelectProps = {
  total: number,
  onClick: () => void,
}
export default function PlayerSelect(props: PlayerSelectProps) {
  const handleClick = () => props.onClick()
  return (
    <div className="player-select-1" onClick={handleClick}>
      <div className="player-select-2">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAfCAYAAAD0ma06AAABaklEQVRIie2XzysFURSAv/e8pERWVv4AG5IFRVKSJNkqW0XKxtZmusnejrJ6O9lYyErKguyUhRJRFsrCRsmv5zk6ulPTSM2bcSbKVzOdud17vu693R9TEJF+YAkbys65cjSzCjeASSPhDdDunHsIC0pAq5EMn7sNOAuCYA6YKQLPhkLNXfVxN9BVNJQp4h/lXl/Wwi/8WuFlnsJDoBOYCOfBWngCPALbQA9wZC1sjMTnwCCwYimMUwEW/O50l4cwZBPoAPbzEiq3wHGeQj1l5mtpUEop0qFcB3prbZikhy+x72ngII2MhD1sjsRrwGwaUS3CUWARGPFrMBNJhC3AclZRyP/x9OeEhbjDWtgEvMeF8n39zOwC19EkuizqfLwF7AD1fiiyoHlf9URxzlV8nmooDHeSqTR3VOdc0qqfQh3SBl9geSFWxvWl/xZ7wBCwClz4Hv/UvL756RkD+oBTRGRYRJ7EnisRGfgAnw6zd34kstIAAAAASUVORK5CYII="
          alt=""
          className="player-select-3"
        /><span className="player-select-4">Total {props.total} Episodes</span>
      </div>
      <span className="player-select-5"></span>
    </div>
  )
}