import UrlViewer from '@/components/url-viewer';
import GridUser from './partial/GridUser';
import GridItem from './partial/GridItem';

export const columnsConfig = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '用户',
    dataIndex: 'uid',
    key: 'uid',
    render: (_, item) => <GridUser data={item.user} />,
  },
  {
    title: 'cid',
    dataIndex: 'cid',
    key: 'cid',
    render: (_, item) => <GridItem data={item} name="cid" />
  },
  {
    title: 'sid',
    dataIndex: 'sid',
    key: 'sid',
    render: (_, item) => <GridItem data={item} name="sid" />
  },
  {
    title: 'ip',
    dataIndex: 'ip',
    key: 'ip',
    render: (_, item) => <GridItem data={item} name="ip" />
  },
  {
    title: 'city',
    dataIndex: 'city',
    key: 'city',
    render: (value) => <div style={{width: 60}}>{value}</div>
  },
  {
    title: 'dl',
    dataIndex: 'dl',
    key: 'dl',
    render: (_, item) => <UrlViewer url={item.dl} length={40} />,
  },
  {
    title: 'refer',
    dataIndex: 'refer',
    key: 'refer',
    render: (_, item) => <UrlViewer url={item.refer} />,
  },
  {
    title: 'ua',
    dataIndex: 'ua',
    key: 'ua',
  },
  {
    title: 'screen',
    dataIndex: 'w',
    key: 'w',
    render: (_, item) => item.w ? <span>{`(${item.w}x${item.h})/${item.devicePixelRatio}`}</span>: ''
  },
  {
    title: 'spider',
    dataIndex: 'spider',
    key: 'spider',
  },
  {
    title: 't',
    dataIndex: 't',
    key: 't',
  },
  {
    title: 'ec',
    dataIndex: 'ec',
    key: 'ec',
  },
  {
    title: 'ea',
    dataIndex: 'ea',
    key: 'ea',
  },
  {
    title: 'el',
    dataIndex: 'el',
    key: 'el',
  },
  {
    title: 'ev',
    dataIndex: 'ev',
    key: 'ev',
  },
  {
    title: '创建',
    dataIndex: 'created',
    key: 'created',
    render: (value) => <div style={{width: 160}}>{value}</div>
  },
  {
    title: 'z',
    dataIndex: 'z',
    key: 'z',
  },
];
