import ActionCol from './partial/ActionCol';

export const columnsConfig = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Coins',
    dataIndex: 'coins',
    key: 'coins',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Name',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Actions',
    key: 'action',
    render: (_, item) => <ActionCol data={item} />,
  },
];
