import './header.css'
const logo = require('@/assets/img/logo.jpg')
import { NavLink } from 'react-router-dom'
import Dropdown from '@/components/ui/dropdown'
import Menu from './menu'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/stores'
import { showLoginModal } from '@/stores/profile'
import MobileSearch from './mobile-search'
import useWindowSize from '@/hooks/useWindowSize'

export default function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const [count, setCount] = useState(0)
  const { user } = useSelector((state: RootState) => state.profile)
  const [keyword, setKeyword] = useState('')
  const { isLogged } = useSelector((state: RootState) => state.profile)
  const [visible, setVisible] = useState(false)
  const { isMobile } = useWindowSize({isClient: true})
  const handleSubmit = () => {
    if (isMobile) {
      setVisible(true)
    } else {
      location.href = `/search?keyword=${keyword}`
    }
  }
  const handleLogin = () => {
    dispatch(showLoginModal())
  }
  const handleClickMore = () => {
    setCount(n => n+1)
  }
  const closeMobileSearch = () => setVisible(false)
  return (
    <div  className="header-1">
      <div  className="header-2">
        <div  className="header-3">
          <img
            alt=""
            src={logo}
            className="header-4"
          />
        </div>
        <div className="header-5">
          <NavLink to="/" className={({isActive}) => isActive ? 'active header-6': 'header-6'}>Home</NavLink>
          <NavLink to="/category" className={({isActive}) => isActive ? 'active header-6': 'header-6'}>Category</NavLink>
        </div>
        <div className="header-8">
          <form className="header-9" action='/search'>
            <input placeholder="search" name="keyword" value={keyword} 
              onChange={(evt) => setKeyword(evt.target.value)} className="header-10" />
            <img
              alt=""
              onClick={handleSubmit}
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAYCAYAAADkgu3FAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjgxQzBBNDg4QTBCNzExRUVBMkYwQzY2Q0VCNTQwNjI1IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjgxQzBBNDg5QTBCNzExRUVBMkYwQzY2Q0VCNTQwNjI1Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6ODFDMEE0ODZBMEI3MTFFRUEyRjBDNjZDRUI1NDA2MjUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6ODFDMEE0ODdBMEI3MTFFRUEyRjBDNjZDRUI1NDA2MjUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6O3OeAAAAB8UlEQVR42qyWzytEURTHZ8wMwzAykR+xUJOlHYkVpWRhqSkLUVMsiJWNhfwBWGCjxGKwsFA2UpQfkUSxksUskGZGRMwPMp7v1Z3pdLvv5zj1aea+e8/5ds5799xrVxTFpmIO0Am6QROoAC6QADGwB3bBGVANkjUmJKEDnIIfRdu+wBZoUImTRXzgAjMgLQn6DiIgJZmLg2EzQmtCgASY4xl6QT6oBL1gVSI4ZkRoSnDaALU6JWkE58SHZdujJcRqnCQOi3o1FzghvvdaQiGy8BA4TAqxzB9IjCE1oYx9gnaTIhkmSZyYTKiLLIhaFGEUCZ+9n87nYSu1km11bLNubCM/8f8srp9OsgelZBy25WZ3/NcOykWhFBlX5SjkyzQc8CoKXZFxW45C9UQoLPY6D3mJSb4JrXwMARLnTZxnGcXBBdd1gxGeqRkrBhNkvKTWvVuF9jNoMpt5wb9MbcM6waawOGigQxSAWUlzXecNWNpU2Ya7FRwOeJMsEQRqwAC40Tir9vn7//OxCycs+/a3QYtQ4WfwCJLAC+qAx8C7uwTNIC0rhxtMgw/FmEV15o+AT6v+rDyj4Bp8S47wHdDHT+WQjtiKXeNyQi8p1eRywsoXIX2NWSFYBgGzlxOrLKhk9OK0/a+N8/bTT65gTCP4K8AADHtMzq9fYhAAAAAASUVORK5CYII="
              className="header-11"
            />
          </form>
          {!isLogged && <img alt="" className="header-16"
            onClick={handleLogin}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAAAkCAMAAABbsy/+AAAARVBMVEX7OAH7OAH7OAH7OAEAAAD7OAH7OAH////+zb/8akH9nID8XTH/8+/9qI/+2s/9tJ/9g2H+5t/8dlH8USH9j3H7RBH+wa/8ifbVAAAABnRSTlOtJvLwAPM4utFfAAAA50lEQVRIx+3Xy27DIBCFYeyk5zAGDL71/R+1DF1EaptuakZq5F/CYFniW1rj7oMbYdDohrsbbjDqNjgHs5wbYdabg2EXdmGvgi0RP/YHjMSTIs0wrRtWvPc5AFjrQXwCktfVXk/GCpcpMx4QxpQWVshTV/Qz48nYzA1I3OsqgDww0W9yLtY2Yfq8Hg8M+uiDeRMs6rZywjsFOLphUw25OtvMFTtnkdwN07AtuuV2NdkLk5Ye9hKgbRKCYkHa0sdxAvZMLzMLvtYFm0jGCd/qgiFIwG/9///Zhb0+ZjlYmI5MpsOg6Zj7AXf7Xf0aRXSrAAAAAElFTkSuQmCC" />}
        </div>
        {isLogged && <div className='flex items-center'>
          <Dropdown closeCount={count} overlay={<Menu onClickMore={handleClickMore} />}>
          <button type="button" className="header-12">
            <span className="header-13"></span><span className="header-14"
              ><img
                alt=""
                src={user.avatar}
                className="header-15"
            /></span>
          </button>
        </Dropdown>
        </div>}
      </div>
      {visible && <MobileSearch onSubmit={closeMobileSearch} />}
    </div>
  )
}