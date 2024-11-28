import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateByKey } from '../store';

export default function ActionCol({ data }) {
  const dispatch = useDispatch();
  const onEdit = () => {
    dispatch(updateByKey(['modalData', data]));
    dispatch(updateByKey(['visible', true]));
  };
  return (
    <div className="space-x-2">
      <Button size="small" onClick={onEdit}>修改</Button>
    </div>
  );
}
