import { PropsWithChildren, useEffect } from "react"
import { createPortal } from 'react-dom'
import './modal.css'

type ModalPros = {
  visible: boolean,
}
export default function Modal(props: PropsWithChildren<ModalPros>) {
  if (props.visible) {
    return createPortal(<div className="modal-wrapper">{props.children}</div>, document.body)
  }
  return null
}