import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDetail } from './store'
import { ThunkDispatch } from "@reduxjs/toolkit";

export function usePageDataOnce() {
  const [query] = useSearchParams()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const playlet_id = query.get('playlet_id')
  const video_id = query.get('video_id')
  useEffect(() => {
    if (playlet_id) {
      dispatch(getDetail({playlet_id, video_id}))
    }
  }, [])
}
