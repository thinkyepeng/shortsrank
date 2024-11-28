import axios from '@/utils/axios';
import { HomeData } from '@/types/data.d'

export function getSectionsAsync() {
  return axios.get<HomeData>('/home/sections');
}
