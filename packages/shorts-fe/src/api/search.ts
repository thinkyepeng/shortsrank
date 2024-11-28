import axios from '@/utils/axios';
import { SearchDataType } from '@/types/data.d'

export function getSearchDataAsync(params: any) {
  return axios.get<SearchDataType>('/search/list', {params});
}
