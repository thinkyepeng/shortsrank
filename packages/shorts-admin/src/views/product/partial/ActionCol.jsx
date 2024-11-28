import { Button, message, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { deleteData } from '@/api/product';
import { updateByKey, increase } from '../store';

export default function ActionCol({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onEdit = () => {
    dispatch(updateByKey(['modalData', data]));
    dispatch(updateByKey(['visible', true]));
  };
  const onDelete = () => {
    deleteData({ id: data.id }).then(() => {
      message.success('success');
      dispatch(increase('refreshCount'));
    }).catch(() => {
      message.warning('failed');
    });
  };
  return (
    <div className="space-x-2 min-w-[120px]">
      <Button size="small" onClick={onEdit}>Edit</Button>
      <Popconfirm
        title="Confirm to delete?"
        onConfirm={onDelete}
        okText="Confirm"
        cancelText="Cancel"
      >
        <Button size="small">Delete</Button>
      </Popconfirm>
    </div>
  );
}
