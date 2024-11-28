import { Outlet } from 'react-router-dom'
import { useEffect } from 'react';
import LoginModal from '@/components/login-modal';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '@/stores/profile';
import { AppDispatch, RootState } from '@/stores';
import SystemAnalytics from '@/components/analytics/SystemAnalytics'

const useAuth = () => {
  const {userInit: init, isLogged, user} = useSelector((state:RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!init) {
      dispatch(getUserInfo);
    }
  }, []);
  return { isLogged, user };
};

export default function GlobalLayout() {
  useAuth()
  return (
    <>
      <Outlet />
      <LoginModal />
      <SystemAnalytics />
    </>
  )
}