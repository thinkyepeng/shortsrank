import { useState } from 'react'
import './mobile-search.css'
import { useNavigate } from 'react-router-dom'

type SearchProps = {
  onSubmit: () => void,
}
export default function MobileSearch(props: SearchProps) {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const handleSubmit = () => {
    props.onSubmit()
    navigate(`/search?keyword=${value}`)
  }
  return (
    <div className="mb-search-1">
      <div className="mb-search-2"></div>
      <div className="mb-search-3">
        <span className="mb-search-4" onClick={props.onSubmit}></span><input
          type="search"
          placeholder="Search"
          value={value}
          onChange={evt => setValue(evt.target.value)}
          className="mb-search-5"
        /><img
          onClick={handleSubmit}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAtCAYAAAA+7zKnAAAES0lEQVRogc2ZeYhcRRCHv111vfDaaCIaSeKRXVFBImgMYiQGVHQ9MRIRQcGgEPwjUUTR9JSKJ+IfEhAVV5TggWjQxAMCGokxQSWCiEZFBNcrUVA3HnhsS5ka8hi63jFvZtwfPBheVXd/06+7uru6L8ZIDe0PHA2cABwCTAN2A36x5zNgK/Cp14SItN367m2UORAYAS4G5gMHlSjzCfAW8BKwto02k6oCrz27HLgWOKBiO8P2LAHeB1YCozXZ6S/pt9SGwE1tgLfqJOBxYDMwr05FRWNeh8Qq4Jw6jRToFhG5u52CefBDwOvAjBL1/A58B/wI/AxMBaYAh5XkeEJEriqPvVMe/LCNzX1yym4D1gCv2mTc1mLX+XQMsBBYAFxYwLJWRM6rC6/AXwGDTplfgfuB+6zHy2qODhHgkhz/Sl8gBb8RONXxXwdcCXxbAbpVGmKfBPZ17EtFZGWZilrhNZrc4/g+BFxfAzqrI4HXbFildLiIfFNUSTZUDuaAj3YQXPWFfd2fHPvDZSrJwt/p+GwCrq7OVyiNTKcDqYgxEkI4riy8TtLrHJ9LuwDe1IfArY7t9qLCTfjLHfuDwFgtvGLpUP0h4XVRCOHgMvCXJWz6ORtdBtdd5QRwb8LUB5ydV7bfhkxqj7HOtrW90DNOG/OL4IeclfTFHoFr749ZYGjViXnlFH6WY/u845T5+ihhPSKEsIdXSuG9SfF9D4Cz+jrxbj87rSWl8AMJw4TF4V4qFXH2sseFT22u+jpw6KiqqQn/3+xx4ccd+GmTAH7czgdJ9edMzKHucSY1nHg5ZutAUgr/sfNpKh0M6iiEoF/5tEQVW/KqbY75dxK2hc5k7obOd5IB64vgcRakPbVTegS/PPHub+CVvELNw8gUJ1RhsXZHRxDTWgY8kLCsEZGRvILNnteY/pjj83wXgJuannMAKkyHZI+Bh+acTbVnbqhDmdCA5TFnJmybRWRuUQXZSaJ5l7scPx2TKzpFbUfO9Q64anYI4YqiSlLZA+2N2Y7/03Yk/KMy7i7p9vuFkovgEhF51DOmwtOZwJ+O/2LL+F5TERjLvGkG4u0Kq/cjIYRUJPpPXsZsrhP7s9KV+VlLCWqu55+Ej2aWzwAuABYB7va2QMl8Zl6ucp6l8twtaUZjFmrHLJ0x3cLvUQUpwypaISJ3lIXHJpT27skdAqirhmSuUory818Cp+REoZ7DhxB2DR/t+ZLPcIxxNMY4Eetpa4xxWYxxY41abm40GpXgm8/MGOONMcYNFf7I9hjjqhjjokw9e8cY36vxB2bVvQ2cYTeBx9oKPWh5+XHbcmiq/F27EkrtjwYsqs1po+3b6sJ3Qho+N7QRFJ4re6HWNYnIXyKiQeGNim3s+N/hmxKRBUX79xatnjTw7PwD55bM1G0RkZcnFbxKRPTa56kcFz1zn6U/Jh28SkT03ks3gW9aslfP2R9YLv94EdkO8C9MKVP/H2if9gAAAABJRU5ErkJggg=="
          alt="search..."
          className="mb-search-6"
        />
      </div>
    </div>
  )
}