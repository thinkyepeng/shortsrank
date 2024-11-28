import Tabs, { TabsOption } from './components/tabs'
import { useEffect, useState } from 'react'
import { getCategoryDataAsync } from '@/api/category'
import './category.css'
import { PlayletType } from '@/types/data'
import Card from '@/components/card'

export default function CategoryPage() {
  const [value, setValue] = useState(0)
  const [options, setOptions] = useState([] as TabsOption[])
  const [data, setData] = useState([] as PlayletType[])
  const [count, setCount] = useState(0)
  const onChange = (v:number) => {
    if (v !== value) {
      setValue(v)
      setCount(n => n+1)
    }
  }
  useEffect(() => {
    const category_id = value
    const params = value > 0 ? {category_id}: {}
    getCategoryDataAsync(params).then(({cats, playlets, catId}) => {
      if (!category_id || catId === category_id) {
        setValue(catId)
        setOptions(cats.map(x => ({label: x.title, value: x.id} as TabsOption)))
        setData(playlets)
      }
    })
  }, [count])
  return (
    <div className='px-[10px] md:px-0'>
      <Tabs options={options} value={value} onChange={onChange} />
      <div className='category-wrapper'>
        {data.map((playlet) => (
          <Card key={playlet.id} data={playlet} sn={0} />
        ))}
      </div>
    </div>
  )
}