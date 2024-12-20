import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getList } from './store';

export function usePageDataOnce() {
  const dispatch = useDispatch();
  const {
    page, pageSize, refreshCount,
    keyword, searchType, filters,
    sorts,
  } = useSelector((state) => state.user);
  const validFilters = filters.filter((t) => t.value !== '').map((t) => `${t.name}:${t.value}`);
  const validSorts = sorts.filter((t) => t.value !== '').map((t) => `${t.name}:${t.value}`);
  useEffect(() => {
    dispatch(getList({
      page, pageSize, keyword, searchType, filters: validFilters, sorts: validSorts,
    }));
  }, [refreshCount]);
}
