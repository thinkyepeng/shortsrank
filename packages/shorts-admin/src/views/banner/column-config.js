import ActionCol from './partial/ActionCol';
import GridImg from './partial/GridImg';

export const columnsConfig = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (_, item) => <GridImg url={item.image} />,
  },
  {
    title: 'Sorts',
    dataIndex: 'sort',
    key: 'sort',
  },
  {
    title: 'Playlet Id',
    dataIndex: 'playlet_id',
    key: 'playlet_id',
  },
  {
    title: 'Enabled',
    dataIndex: 'enabled',
    key: 'enabled',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, item) => <ActionCol data={item} />,
  },
];
