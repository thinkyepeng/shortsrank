import { createSlice } from '@reduxjs/toolkit';
import { getUserInfoAsync, logoutAsync } from '@/api/user'
import { AppDispatch } from '.';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      username: '',
      nickname: '',
      role: '',
      balance: 0,
      avatar: '',
    },
    isLogged: false,
    userInit: false,
    modal: false,
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
    showLoginModal: (state) => {
      state.modal = true
    },
    hideLoginModal: (state) => {
      state.modal = false
    }
  },
});

export const { update, setInit, logout: logoutReducer, showLoginModal, hideLoginModal } = userSlice.actions;

export const getUserInfo = (dispatch: AppDispatch) => getUserInfoAsync().then((data) => {
  dispatch(update(data));
}).catch(() => {
  dispatch(setInit());
});

export const logout = (dispatch: AppDispatch) => logoutAsync().then((data) => {
  dispatch(logoutReducer());
})

export default userSlice;
