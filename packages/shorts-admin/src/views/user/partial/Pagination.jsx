import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateByKey, increase } from '../store';

export default function TopicPagination() {
  const dispatch = useDispatch();
  const {
    page, pageSize, total, pending,
  } = useSelector((state) => state.user);
  const onChange = (page) => {
    dispatch(updateByKey(['page', page]));
    dispatch(increase('refreshCount'));
  };
  return (
    <div className="flex items-center justify-between">
      <div className="hidden sm:block text-sm text-[#999999]">
        Current page
        {' '}
        {page}
        {' / '}
        {total}
        {' '}
        in total
      </div>
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        disabled={pending}
        onChange={onChange}
        showQuickJumper
        simple
      />
    </div>
  );
}
