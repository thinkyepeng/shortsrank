/**
 * 用户管理
 */

import MainLayout from '@/layouts/main-layout';
import TableView from '@/layouts/table-view';
import Header from './partial/Header';
import Pagination from './partial/Pagination';
import MainTable from './partial/MainTable';
import { usePageDataOnce } from './hook';

export default function UserPage() {
  const path = ['Users'];
  usePageDataOnce();
  return (
    <MainLayout path={path}>
      <TableView header={<Header />} pagination={<Pagination />}>
        <MainTable />
      </TableView>
    </MainLayout>
  );
}
