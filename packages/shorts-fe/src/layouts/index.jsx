import { Outlet } from 'react-router-dom';
import { useFullscreenFix } from '@/hooks';
import Header from '@/components/header/index';

export default function Layout() {
  useFullscreenFix();
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
