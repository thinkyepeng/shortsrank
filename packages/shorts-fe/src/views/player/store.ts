import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPlayletAsync } from '@/api/player'
import { GroupedVideoType, PlayletType, VideoType } from '@/types/data';

export const getDetail = createAsyncThunk('playlet/detail', getPlayletAsync);

const pageSlice = createSlice({
  name: 'player',
  initialState: {
    playletId: 0,
    playlet: { auto_unlock: 0, } as PlayletType,
    videos: [] as GroupedVideoType[],
    videoId: 0, // 当前选中的videoId
    video: {} as VideoType,// 当前选中的video
    tabId: -1,
    pending: false, // 正在加载列表数据
    playerCount: 0, //
    nextCount: 0,
    // 弹窗状态
    visible: false,
    modalData: {},
    isClick: true, // 是否由点击引起的弹窗显示
  },
  reducers: {
    updatePlayetId: (state, action) => {
      state.playletId = action.payload
    },
    updateTabId: (state, action) => {
      state.tabId = action.payload
    },
    refreshPlayer: (state) => {
      state.playerCount += 1
    },
    updateVideoId: (state, action) => {
      state.videoId = action.payload
      state.video = (state.videos[state.tabId].videos.find(x => x.id === action.payload) || {}) as VideoType
    },
    updateVisible: (state, action) => {
      state.visible = action.payload
    },
    updateAutoUnlock: (state, action) => {
      state.playlet.auto_unlock = action.payload
    },
    updateVideoLink: (state, action) => {
      const { video_id, link } = action.payload
      const index = state.videos[state.tabId].videos.findIndex(x => x.id === video_id)
      state.videos[state.tabId].videos[index].link = link
      state.video = state.videos[state.tabId].videos[index]
    },
    gotoVideo: (state, action) => {
      state.videoId = action.payload
      state.video = (state.videos[state.tabId].videos.find(x => x.id === action.payload) || {}) as VideoType
      if (state.video.link) {
        state.playerCount += 1
      } else if (!state.video.free) {
        state.visible = true
      }
    },
    updateClickStatus: (state, action) => {
      state.isClick = action.payload
    },
    updateNextCount: (state) => {
      state.nextCount += 1
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetail.fulfilled, (state, action) => {
        const {
          videos, video, videoId, tabId, ...others
        } = action.payload;
        state.videos = videos
        state.playlet = others
        state.video = video
        state.videoId = videoId
        state.tabId = tabId
        state.pending = false;
        state.playerCount += 1
      })
      .addCase(getDetail.pending, (state) => {
        state.pending = true;
      })
      .addCase(getDetail.rejected, (state) => {
        state.pending = false;
      });
  },
})

export const { updatePlayetId, updateVideoId, updateTabId, refreshPlayer,
  updateAutoUnlock, updateVisible, updateVideoLink, gotoVideo,
  updateClickStatus, updateNextCount } = pageSlice.actions

export default pageSlice