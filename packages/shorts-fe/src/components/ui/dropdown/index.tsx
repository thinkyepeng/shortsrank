import { FC, ReactNode, useState, PropsWithChildren, useRef, useEffect } from 'react'
import cx from 'classnames'
import './dropdown.css'

type DropdownProps = {
  overlay: ReactNode,
  className?: String,
  ref?: React.MutableRefObject<null>,
  closeCount?: number,
}

const Dropdown = (props: PropsWithChildren<DropdownProps>) => {
  const [inButton, setInButton] = useState(false)
  const [inOverlay, setInOverlay] = useState(false)
  const interval1 = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mouseenter1 = () => {
    if (interval1.current) {
      clearInterval(interval1.current)
    }
    setInButton(true)
  }
  const mouseleave1 = () => {
    interval1.current = setTimeout(() => {
      setInButton(false)
    }, 200)
  }
  const mouseenter2 = () => {
    setInOverlay(true)
  }
  const mouseleave2 = () => {
    setInOverlay(false)
  }
  useEffect(() => {
    if (props.closeCount && props.closeCount > 0) {
      setInButton(false)
      setInOverlay(false)
    }
  }, [props.closeCount])
  const open = inButton || inOverlay
  return (
    <div className={cx(props.className, 'dropdown-wrapper')} onMouseEnter={mouseenter1} onMouseLeave={mouseleave1}>
      <span>{props.children}</span>
      {open ? <div className='dropdown-overlay' 
        onMouseEnter={mouseenter2} onMouseLeave={mouseleave2}>{props.overlay}</div>: null}
    </div>
  )
}

export default Dropdown