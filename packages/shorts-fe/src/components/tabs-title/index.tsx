import { useState, useRef, useEffect } from "react"
import cx from 'classnames'
import './tabs-title.css'

export type ClickType = (evt: React.MouseEvent<HTMLElement>, value:number) => void

export type TabsOptionType = {
  label: string,
  value: any
}

export type TabsTitleProps = {
  options: TabsOptionType[],
  value: number,
  onClick?: ClickType,
}

function getTransformX(element:HTMLElement) {
  return element.getBoundingClientRect().x - (element.parentNode as HTMLElement).getBoundingClientRect().x
}

export default function TabsTitle(props: TabsTitleProps) {
  const ref = useRef(null)
  const [x, setX] = useState(0)
  const [width, setWidth] = useState(0)
  const handleClick:ClickType = (evt, v) => {
    const positionX =  getTransformX(evt.target as HTMLElement)
    setX(v > 0 ? positionX: 0)
    const width = (evt.target as HTMLElement).getBoundingClientRect().width
    setWidth(width)
    if (props.onClick) {
      props.onClick(evt, v)
    }
  }
  useEffect(() => {
    if (!ref.current) {
      return
    }
    const target = (ref.current as HTMLElement).querySelector(`.tabs-title-7:nth-child(${props.value+2})`)
    if (!target) {
      return
    }
    const positionX =  getTransformX(target as HTMLElement)
    setX(props.value > 0 ? positionX: 0)
    const width = (target as HTMLElement).getBoundingClientRect().width
    setWidth(width)
  }, [ref, props.value])
  return (
    <div className="tabs-title-1" ref={ref}>
      <div className="tabs-title-2">
        <div className="tabs-title-3">
          <div className="tabs-title-4">
            <div className="tabs-title-5" style={{transform: `translateX(${x}px)`, width}}></div>
            {props.options.map((item, key) => (
              <div
                className={cx({active: key === props.value}, "tabs-title-7")}
                key={item.label}
                onClick={(evt) => handleClick(evt, key)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}