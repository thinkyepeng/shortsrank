import ActionCol from './partial/ActionCol';
import GridUser from './partial/GridUser';

export const columnsConfig = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    render: (_, item) => <GridUser data={item} />,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nickname',
    dataIndex: 'nickname',
    key: 'nickname',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    render: (value) => <div style={{width: 60}}>{value === 'admin' ? '管理员' : '用户'}</div>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    render: (value) => <div style={{width: 160}}>{value}</div>
  },
  {
    title: 'Updated',
    dataIndex: 'updated',
    key: 'updated',
  },
];
