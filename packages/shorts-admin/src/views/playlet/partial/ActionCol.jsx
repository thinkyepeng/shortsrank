import { Button, message, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { deleteData } from '@/api/playlet';
import { useNavigate } from 'react-router-dom'
import { updateByKey, increase } from '../store';
import { updateByKey as updateByKey2 } from '@/views/video/store';

export default function ActionCol({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onEdit = () => {
    dispatch(updateByKey(['modalData', data]));
    dispatch(updateByKey(['visible', true]));
  };
  const viewVideos = () => {
    dispatch(updateByKey2(['searchType', 'playletId']))
    dispatch(updateByKey2(['keyword', data.id]))
    navigate('/video')
  }
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
      <Button size="small" onClick={viewVideos}>Videos</Button>
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
