import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  DoubleLeftOutlined, DoubleRightOutlined,
} from '@ant-design/icons';
import cx from 'classnames';
import { toggleFold } from '@/stores/system';
import logoImage from '@/assets/image/logo-white@2x.png';
import TreeMenu from './partial/TreeMenu';

export default function Navbar() {
  const folded = useSelector((state) => state.system.folded);
  const dispatch = useDispatch();
  const handleFold = () => dispatch(toggleFold());
  // eslint-disable-next-line no-undef
  const siteName = ADMIN_SITE_NAME;
  return (
    <div className={cx('flex h-screen overflow-hidden flex-col border-r transition-all bg-white', { 'w-[240px]': !folded, 'w-[50px]': folded })}>
      <div className="h-[56px] px-4 flex items-center font-semibold text-lg bg-[#3D6FFF] text-white">
        <Link to="/" className="flex items-center space-x-2 whitespace-nowrap overflow-hidden text-ellipsis">
          <img src={logoImage} className="w-[18px]" alt="" />
          <span className={cx({ hidden: folded })}>{siteName}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4 mx-2 border-b border-slate-300 relative">
        <TreeMenu hideText={folded} />
        <div className="absolute right-0 bottom-2 w-6 h-6 flex items-center cursor-pointer" onClick={handleFold}>
          {folded ? <DoubleRightOutlined className="text-gray-700" /> : <DoubleLeftOutlined className="text-gray-700" />}
        </div>
      </div>
    </div>
  );
}
