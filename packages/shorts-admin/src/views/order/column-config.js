import GridStatus from './partial/GridStatus';
import GridUser from './partial/GridUser';
import GridItem from './partial/GridItem';

export const columnsConfig = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'User',
    dataIndex: 'userId',
    key: 'userId',
    render: (_, item) => <GridUser data={item.user} />,
  },
  {
    title: 'Order Number',
    dataIndex: 'out_order_number',
    key: 'out_order_number',
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Payment Type',
    dataIndex: 'payment',
    key: 'payment',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_, item) => (
      <span>
        $
        {item.price}
      </span>
    ),
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    key: 'unit',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, item) => <GridStatus status={item.status} />,
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    render: (value) => <div style={{ width: 160 }}>{value}</div>,
  },
];
