import { configureStore } from '@reduxjs/toolkit';
import profileSlice from './profile';
import playerSlice from '../views/player/store';

const store = configureStore({
  reducer: {
    profile: profileSlice.reducer,
    player: playerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
