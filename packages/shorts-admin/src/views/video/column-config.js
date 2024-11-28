import ActionCol from './partial/ActionCol';
import UrlViewer from '@/components/url-viewer'

export const columnsConfig = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Free',
    dataIndex: 'free',
    key: 'free',
  },
  {
    title: 'Link',
    dataIndex: 'link',
    key: 'link',
    render: (_, item) => <UrlViewer url={item.link} />
  },
  {
    title: 'Num',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: 'PlayletId',
    dataIndex: 'playlet_id',
    key: 'playlet_id',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, item) => <ActionCol data={item} />,
  },
];
