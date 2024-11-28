import './search.css'
import SearchItem from './components/search-item'
import { getSearchDataAsync } from '@/api/search'
import { useEffect, useState } from 'react'
import { SearchItemType } from '@/types/data'
import { useSearchParams } from 'react-router-dom'

export default function SearchPage() {
  const [page, setPage] = useState(1)
  const [query] = useSearchParams();
  const keyword = query.get('keyword')
  const [data, setData] = useState([] as SearchItemType[])
  const [isLast, setIsLast] = useState(false)
  const [count, setCount] = useState(false)
  const [pending, setPending] = useState(false)
  useEffect(() => {
    if (pending) {
      return
    }
    const params = {page, keyword}
    setPending(true)
    getSearchDataAsync(params).then(d => {
      setData(rows => [...rows, ...d.rows])
      const last = d.page * d.pageSize <= d.total
      setIsLast(last)
      setPending(false)
    }).catch(() => {
      setPending(false)
    })
  }, [count])
  return (
    <div className="search-wrapper">
      <div className="search-list">
        {data.map((item) => (
          <SearchItem key={item.id} data={item} />
        ))}
        
      </div>
    </div>
  )
}