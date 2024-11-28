import { Popover, Button } from 'antd';
import { getVisitors,updateByKey, increase } from '../store'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { ReloadOutlined} from '@ant-design/icons'

function DetailPanel() {
  const dispatch = useDispatch()
  const { visitors, spin } = useSelector(state => state.log)
  const refresh = () => {
    if (!spin) {
      dispatch(getVisitors())
    } 
  }
  const handleSearch = (cid) => {
    dispatch(updateByKey(['searchType', 'cid']));
    dispatch(updateByKey(['keyword', cid]));
    dispatch(updateByKey(['page', 1]));
    dispatch(increase('refreshCount'));
  }
  useEffect(() => {
    dispatch(getVisitors());
  }, []);
  return (
    <div className='w-[200px]'>
      <div className='flex items-center justify-between mb-2'>
        <span className='font-semibold'>访客列表（{visitors.length}）</span>
        <ReloadOutlined onClick={refresh} spin={spin} />
      </div>
      <div className='max-h-[50vh] overflow-x-scroll'>
        {visitors.map((visitor) => (
          <div key={visitor.cid} className='flex items-center justify-between cursor-pointer hover:bg-slate-100'
            onClick={() => handleSearch(visitor.cid)}>
            <div className='w-24'>{visitor.cid}</div>
            <div>{visitor.total}</div>
            <div>{visitor.created}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Overview() {
  return (
    <Popover title="今日访客" content={<DetailPanel />} placement="bottom">
      <Button size="small">Overview</Button>
    </Popover>
  )
}