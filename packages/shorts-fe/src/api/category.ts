import axios from '@/utils/axios';
import { CategoryDataType } from '@/types/data.d'

export function getCategoryDataAsync(params: any) {
  return axios.get<CategoryDataType>('/category/list', {params});
}
