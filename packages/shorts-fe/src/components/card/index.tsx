import { PlayletType } from '@/types/data.d'
import './card.css'
import { useNavigate } from 'react-router-dom'

type CardProps = {
  data: PlayletType,
  sn: number | null,
}

export default function Card(props: CardProps) {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(`/player?playlet_id=${props.data.id}`)
  }
  return (
    <div className="card-1" onClick={handleClick}>
      <div className="card-2">
        <div className="card-3">
          <img
            alt=""
            src={props.data.cover}
            className="card-4"
          />
          {props.sn ? <div className="card-5">
            <div className="card-6"></div>
            <p className="card-7">{props.sn}</p>
            <p className="card-8">{props.sn}</p>
          </div>: null}
          <div className="card-9">
            <div className="card-10">
              <p className="card-11">{props.data.title}</p>
              <p className="card-12"></p>
              <p className="card-13">
                {props.data.intro}
              </p>
              <img
                alt=""
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAAAeCAMAAADErnYDAAAAZlBMVEUAAAD7OAH7OAH7OAH7OAH7OAH7OAH////8akH9nID8XTH+zb/+tJ/+z8H9g2H/5t/8USH/8+/9j3H7RBH+29D/+Pb+0sX+wa/+u6f9qI/9hmX+3tX8dlH7QAv+xrb9pYz8c038WizIWqplAAAABnRSTlMA875NhEzEWFrSAAABT0lEQVRYw9XX2W7CMBRFUTOdc+0Yk5GZDv//k41vqhTaVIIHC7MkhiQvW7YTxcaYxXyGJ5vNV6a3RBaWxqyQiYWZIxNz8/R1Mq4Xg2y8asqx2xzxsCQpJ5JbwT8acZiSJGXLaF/ihu1Jf05YYEqSlDVVZy+4QuWfkkKewk1KLQfSDSlOxMVvp/+HAUyWot7kKkWADWVIKUi2TeBGrziodCnKT6cEayvWTUWHM1uo1Cm8niA7ThCc7Gjheeg/NVTqlG5q2TYFIwvhBhV1qSRP8e4nxdvaQVMOLEQ8bZyxM3dQaVPWghGpBzoQcW7KNqbUrBigUqbo4/9PSkkysFfFlKb/xSBFSsGoe7/8etqWUGItgvdBbGxrx3ssRUrL3v4Tdwie/C5MkrIntx+4cwCrgMcYpOGkwUNe99UprZxeszPafCyQiUVOG9VMtu/9mHwB0OFm3lrJzfgAAAAASUVORK5CYII="
                className="card-14"
              />
            </div>
          </div>
        </div>
        <p className="card-15">{props.data.title}</p>
      </div>
    </div>
  )
}