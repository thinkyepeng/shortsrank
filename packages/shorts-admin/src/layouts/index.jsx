import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogoutOutlined } from '@ant-design/icons';
import cx from 'classnames';
import { useFullscreenFix } from '@/hooks';
import { getUserInfo, logout } from '../stores/profile';
import Navbar from '../components/nav-bar';

const useAuth = () => {
  const init = useSelector((state) => state.profile.userInit);
  const isLogged = useSelector((state) => state.profile.isLogged);
  const user = useSelector((state) => state.profile.usesr);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!init) {
      dispatch(getUserInfo);
    }
  }, []);
  useEffect(() => {
    if (init && !isLogged) {
      navigate('/login');
    }
  }, [init]);
  return { isLogged, user };
};

export default function Layout() {
  useFullscreenFix();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const folded = useSelector((state) => state.system.folded);
  const username = useSelector((state) => state.profile.user.username);
  const { isLogged } = useAuth();
  // eslint-disable-next-line no-undef
  const siteName = ADMIN_SITE_NAME;
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  if (!isLogged) {
    return null;
  }
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F8FC]">
      <Navbar />
      <div className={cx('flex flex-col transition-all', { 'w-[calc(100vw-240px)]': !folded, 'w-[calc(100vw-50px)]': folded })}>
        <div className="h-[56px] px-4 flex items-center justify-between bg-white">
          <div className="flex-1 text-gray-700 text-lg">
            <span className={cx(folded ? '' : 'hidden')}>{siteName}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-700">
            <span>{username}</span>
            <span>|</span>
            <div className="flex items-center space-x-1 hover:font-semibold cursor-pointer" onClick={handleLogout}>
              <span>Logout</span>
              <LogoutOutlined />
            </div>
          </div>
        </div>
        <div className="h-[calc(100vh-56px)]"><Outlet /></div>
      </div>
    </div>
  );
}
