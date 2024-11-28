import { createSlice } from '@reduxjs/toolkit';
import { getUserInfoAsync } from '@/api/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: '',
      role: '',
    },
    isLogged: false,
    userInit: false,
  },
  reducers: {
    update: (state, action) => ({
      ...state,
      user: action.payload,
      userInit: true,
      isLogged: true,
    }),
    setInit: (state) => ({ ...state, userInit: true }),
    logout: (state) => {
      state.isLogged = false;
    },
  },
});

export const { update, setInit, logout } = userSlice.actions;

export const getUserInfo = (dispatch) => getUserInfoAsync().then((data) => {
  dispatch(update(data));
}).catch(() => {
  dispatch(setInit());
});

export default userSlice;
