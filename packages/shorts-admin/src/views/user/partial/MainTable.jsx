import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { columnsConfig } from '../column-config';

export default function MainTable() {
  const { columns } = useSelector((state) => state.user);
  const dataSource = useSelector((state) => state.user.list);
  const visibleColumns = columnsConfig.filter((t) => columns.includes(t.key));
  return (
    <Table columns={visibleColumns} dataSource={dataSource} pagination={false} rowKey="id" />
  );
}
