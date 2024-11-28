import Modal from "@/components/ui/modal"
import { PropsWithChildren, useEffect } from "react"
import './unlock-modal.css'
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/stores"
import { updateAutoUnlock, updateVisible, updateVideoLink, refreshPlayer } from '../../store'
import { showLoginModal } from '@/stores/profile'
import { unlockVideoAsync } from '@/api/player'
import { getUserInfo } from "@/stores/profile"
import useWindowSize from '@/hooks/useWindowSize'

export type UnlockModalProps = {
  visible: boolean,
}

export default function UnlockModal(props: PropsWithChildren<UnlockModalProps>) {
  const { playlet, videoId, isClick } = useSelector((state: RootState) => state.player)
  const { user, isLogged } = useSelector((state: RootState) => state.profile)
  const { isMobile } = useWindowSize({isClient: true})
  const dispatch = useDispatch<AppDispatch>()
  const toggleUnlock = () => {
    dispatch(updateAutoUnlock(playlet.auto_unlock ? 0: 1))
  }
  const handleClose = () => {
    dispatch(updateVisible(false))
  }
  const handleUnlock = () => {
    if (!isLogged) {
      dispatch(showLoginModal())
      dispatch(updateVisible(false))
    } else {
      unlockVideoAsync({video_id: videoId, auto_unlock: playlet.auto_unlock}).then(d => {
        dispatch(getUserInfo)
        dispatch(updateVideoLink({video_id: videoId, link: d.link}))
        dispatch(refreshPlayer())
        dispatch(updateVisible(false))
      })
    }
  }
  useEffect(() => {
    console.log('isClick', isClick)
    if (playlet.auto_unlock && !isClick && user.balance >= playlet.price) {
      handleUnlock()
    }
  }, [props.visible])
  return (
    <Modal visible={props.visible}>
      <div className="unlock-1">
        <header className="unlock-2">
          <ul  className="unlock-3">
            <li  className="unlock-4">
              Coin balance: <span  className="unlock-5">{user.balance} Coins</span>
            </li>
            <li  className="unlock-6">
              Price: <span  className="unlock-7">{playlet.price} Coins</span>
            </li>
          </ul>
          <button aria-label="Close this dialog" type="button" className="unlock-8" onClick={handleClose}>
            <i className="unlock-9 text-white"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                className="unlock-10"
              >
                <path
                  fill="currentColor"
                  d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                  className="unlock-11"
                ></path></svg></i>
          </button>
        </header>
        <div className="unlock-12"></div>
        <footer className="unlock-13">
          <span  className="unlock-14"
            ><div className="unlock-15"
              onClick={handleUnlock}
              >Unlock Now</div></span>
          <div  className="unlock-16 text-white">
            {playlet.auto_unlock ? <img
              onClick={toggleUnlock}
              alt=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABuElEQVQ4jaXVT4gPYRjA8c/+SOTAxZ9oTw5O5E8iUQo15eLmwkHuDhz8+R2mVROh5E4uiquSVpQNxWELe5ALWyIbcuBmV6un3l9N08ya8fueppnn/b7P+/Q+z4zM7hqxAEuxD5uxDvP4jDeYwGyR5bULm8TLcBbHMdqw6TRu4HKR5XNtxIdwC6sWOkqJOMHRIssnyi97laATuN9BGqzHk/742JGmjPfjcQdhHTuKLJ8sZ7wED4aUBo8GDwNxnuRdma7Er+yPj52SShFX6juWd5RGMhdwFadL72fiakbGB/9DeilJg1+Vb2uxezG2d5RexPn0fB0na2J29tIOVZ4jw8eaTP8lDdb0UptWifo9xFb8KGV6roU0mO+lYle5i01Juhf9lpkOmIkaT9Z8iM57hW2YwtsO0uBlXLe4v1+xoibgDzbifQfppyLLR6MUv3GtIWgRXuBOS2lwRWlWREl+pnE5DN+KLF+t1NJz6XoNy4HB+vLYfIpjQ4gPF1k+VScObqfxGcO7LR+ihYssv1de0PRripqfSb+mDQ07vMPNIstjCNUK6oiaF6mF92BLav3o0i94jWeNR8JfPThmgfLo69cAAAAASUVORK5CYII="
              className="unlock-17"
            />: 
            <img 
              onClick={toggleUnlock}
              className="unlock-17" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAB8ElEQVQ4ja3UT4hNYRjH8Y8/pWRBqevPRNQsrsVLs2FBCo0/pTQRC3ZELKYshLClRhYW2LAgUWrEhmIlsWAmvVKyQKScIil1NfnXq/fUcbtj/t1fnd57nve83/uc5/yeZ1JPT49hNAPbsB4rMT/HGxjAffSHEJ63OjwceDuupf1K7COG0IHJlfgFHAwhNKqA6gNJU3AD1zO0D6swHXOxEFNRRy/eYB8+xBjXDgdOoKfYipuYjUN4mF+/1G+8xFksxhHMSqWJMW5oBb6FZTiJVJ/PLSvfpBDCKXTn6J0Y48wqeCM2pw0cHQ2wqhDCPezJof6/Na3X66lmMdduCX6NBVqr1cp1sCiKdVhdFMWzlPEWTMNp/Bhrtk3qzbcnSnDS5QlCU0kG8Q1dCVzapKXRx6HH8sebk83fLr1WcUWjjeChEvwd89oIrpXgJ9kVtTaBV5TguznQPcKBERVjTK29AF8S+Eo+cLwN2R7O67kEfo/z6MTeCWTbkYdWMkJf6Yr92dhptnaNk/0grztCCF+r062s8UClG0eTaWeM8QUW4WII4bamsZk6ZlP+neZxavHwH2Zy0TG8ysMrQXeXm2miVZXGZvrnS9iVr3d4lNefuVOXNpVsZwjhahXUDE56izUZegDLs4Wa9SkncCaEUPyziT+9kHJott2d3QAAAABJRU5ErkJggg==" />}
            Auto-unlock next episode
          </div>
        </footer>
      </div>
    </Modal>
  )
}