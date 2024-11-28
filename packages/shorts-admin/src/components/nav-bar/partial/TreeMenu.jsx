import cx from 'classnames';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import icoDocument from '@/assets/image/icon-document@2x.png';
import icoGraph from '@/assets/image/icon-graph@2x.png';
import icoImport from '@/assets/image/icon-import@2x.png';
import icoTopic from '@/assets/image/icon-topic@2x.png';
import icoUser from '@/assets/image/icon-user@2x.png';
import icoWord from '@/assets/image/icon-word@2x.png';
import icoMore from '@/assets/image/icon-more@2x.png';
import tagIcon from '@/assets/image/tag-fill.png';
import logIcon from '@/assets/image/logs.png';
import orderIcon from '@/assets/image/orders_fill.png';
import productIcon from '@/assets/image/product.png';
import videoIcon from '@/assets/image/video_fill.png';
import bannerIcon from '@/assets/image/banner.png';

const iconMap = {
  document: icoDocument,
  graph: icoGraph,
  import: icoImport,
  topic: icoTopic,
  user: icoUser,
  word: icoWord,
  tag: tagIcon,
  log: logIcon,
  order: orderIcon,
  product: productIcon,
  video: videoIcon,
  banner: bannerIcon,
};

function getIcon(type) {
  return type in iconMap ? iconMap[type] : iconMap.graph;
}

function TreeIcon({ type }) {
  const src = getIcon(type);
  return <img src={src} className="w-4 h-4" alt="" />;
}

function TreeItem({ data, hideText }) {
  const menuCls = 'px-2 py-2 my-1 hover:bg-[#ededed] rounded-lg cursor-pointer text-md block text-gray-700 flex items-center h-[40px]';
  const menuTextCls = cx('whitespace-nowrap overflow-hidden text-ellipsis', { hidden: hideText });
  const children = data.children || [];
  const hasChildren = children.length > 0;
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);
  return (
    <div>
      {hasChildren
        ? (
          <div className={cx('justify-between', menuCls)} onClick={toggle}>
            <div className="flex items-center space-x-2">
              <TreeIcon type={data.icon} />
              <span className={menuTextCls}>{data.text}</span>
            </div>
            {!hideText && <img src={icoMore} className="w-2" alt="" />}
          </div>
        ) : (
          <Link className={cx('cursor-pointer space-x-2', menuCls)} to={data.link}>
            <TreeIcon type={data.icon} />
            <span className={cx(menuTextCls)}>{data.text}</span>
          </Link>
        )}
      <div className={cx('pl-8', { hidden: !visible })}>
        {children.map(((item, key) => (
          <Link to={item.link} className="flex items-center space-x-2 text-[#333333] my-2" key={key}>
            <div className="w-[6px] h-[6px] rounded-full bg-[#999999]" />
            <span>{item.text}</span>
          </Link>
        )))}
      </div>

    </div>
  );
}

export default function TreeMenu({ hideText }) {
  const data = [
    {
      text: 'Users',
      icon: 'user',
      link: '/user',
    },
    {
      text: 'Logs',
      icon: 'log',
      link: '/log',
    },
    {
      text: 'Categories',
      icon: 'graph',
      link: '/category',
    },
    {
      text: 'Playlets',
      icon: 'product',
      link: '/playlet',
    },
    {
      text: 'Videos',
      icon: 'video',
      link: '/video',
    },
    {
      text: 'Products',
      icon: 'product',
      link: '/product',
    },
    {
      text: 'Orders',
      icon: 'order',
      link: '/order',
    },
    {
      text: 'Banners',
      icon: 'banner',
      link: '/banner',
    },
  ];
  return (
    <div>
      {data.map((item, key) => <TreeItem data={item} hideText={hideText} key={key} />)}
    </div>
  );
}
