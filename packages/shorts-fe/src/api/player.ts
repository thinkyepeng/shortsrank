import axios from '@/utils/axios';
import { PlayetDetailType } from '@/types/data.d'

export function getPlayletAsync(params: any) {
  return axios.get<PlayetDetailType>('/playlet/detail', {params});
}

export function unlockVideoAsync(payload: any) {
  return axios.post<{link: string}>('/playlet/unlock_video', payload);
}