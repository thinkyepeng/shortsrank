import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/views/user/store';
import orderSlice from '@/views/order/store';
import playletSlice from '@/views/playlet/store';
import videoSlice from '@/views/video/store';
import categorySlice from '@/views/category/store';
import productSlice from '@/views/product/store';
import bannerSlice from '@/views/banner/store';
import logSlice from '@/views/log/store';
import profileSlice from './profile';
import systemSlice from './system';

export default configureStore({
  reducer: {
    profile: profileSlice.reducer,
    system: systemSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
    playlet: playletSlice.reducer,
    video: videoSlice.reducer,
    category: categorySlice.reducer,
    product: productSlice.reducer,
    banner: bannerSlice.reducer,
    log: logSlice.reducer,
  },
});
