import ActionCol from './partial/ActionCol';
import GridCover from './partial/GridCover';
import TextViewer from '@/components/text-viewer'

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
    title: 'Intro',
    dataIndex: 'intro',
    key: 'intro',
    render: (_, item) => <TextViewer value={item.intro} />
  },
  {
    title: 'Cover',
    dataIndex: 'cover',
    key: 'cover',
    render: (_, item) => <GridCover data={item} value={item.cover} />
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, item) => <ActionCol data={item} />,
  },
];
