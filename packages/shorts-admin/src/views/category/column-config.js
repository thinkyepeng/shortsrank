import ActionCol from './partial/ActionCol';

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
    title: 'Sorts',
    dataIndex: 'sort',
    key: 'sort',
  },
  
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, item) => <ActionCol data={item} />,
  },
];
