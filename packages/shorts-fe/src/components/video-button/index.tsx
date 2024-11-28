import { VideoType } from '@/types/data'
import './video-button.css'
const playingGif = require('@/assets/img/playing.gif')

type VideoButtonProps = {
  data: VideoType,
  size?: string,
  playing?: boolean,
  handleClick?: (item: VideoType) => void
}
export default function VideoButton(props: VideoButtonProps) {
  const handleClick = () => {
    if(props.handleClick) {
      props.handleClick(props.data)
    }
  }
  if (props.size === 'small') {
    if (props.playing) {
      return (
        <div className="page-player-265" onClick={handleClick}>
          <img
            src={playingGif}
            alt=""
            className="page-player-264"
          />
        </div>
      )  
    }
    return (
      <div className="page-player-265" onClick={handleClick}>
        <span className="page-player-266">{props.data.num}</span>
        {!props.data.link ? <i className='page-player-271'></i>: null}
      </div>
    )
  }
  return (
    <div className="video-button-1" onClick={handleClick}>
      <span className="video-button-2">{props.data.num}</span>
      {props.data.free < 1 ? <div className="video-button-3">
        <img
          alt=""
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU3RkY1NEE3QTBCNzExRUVCMDJEQ0UyQUU5Q0NDREU3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU3RkY1NEE4QTBCNzExRUVCMDJEQ0UyQUU5Q0NDREU3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTdGRjU0QTVBMEI3MTFFRUIwMkRDRTJBRTlDQ0NERTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTdGRjU0QTZBMEI3MTFFRUIwMkRDRTJBRTlDQ0NERTciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz52PAE2AAAAwklEQVR42lyPsQ4BQRCG5+4E3YlINKKg9g6i1HsBpdpLaEWh0qivu4onoRAaUeCU5BLr37t/Y7KTfMnOzDezu2KMEcUUZKaMBDRcT0szCnuw5vkEqlqM2NiqwSZrcy3WWBx4T3m7YZsswZliDm4KF7vAFLpcQQo6IAcv0AMHEIOJcGLsXRl7eRpKGW35x4IbddSdGKhiy5MKp8LkoRorcFH5F3ycOAIZp59gA4bAfjQCffvrIw5dSiE3OMHwWfefAAMAlivm9AD7USoAAAAASUVORK5CYII="
          className="video-button-4"
        />
      </div>: null}
    </div>
  )
}