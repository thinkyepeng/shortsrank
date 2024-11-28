import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { columnsConfig } from '../column-config';
import { storeName } from '../config';

export default function MainTable() {
  const { columns, list: dataSource } = useSelector((state) => state[storeName]);
  const visibleColumns = columnsConfig.filter((t) => columns.includes(t.key));
  return (
    <Table columns={visibleColumns} dataSource={dataSource} pagination={false} rowKey="id" />
  );
}
