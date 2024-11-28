import {
  Modal, message, Input, Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { pick } from 'lodash';
import Upload from '@/components/upload';
import { updateData } from '@/api/banner';
import { increase, updateByKey, updateModal } from '../store';
import { storeName } from '../config';

export default function AddModal() {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const { modalData: data, visible } = useSelector((state) => state[storeName]);
  const onCancel = () => dispatch(updateByKey(['visible', false]));
  const onChangeString = (name) => (evt) => dispatch(updateModal([name, evt.target.value]));
  const onChangeBool = (name) => (checked) => dispatch(updateModal([name, checked ? 1 : 0]));
  const onSubmit = () => {
    if (pending) {
      return;
    }
    setPending(true);
    const isEdit = !!data.id;
    const payload = pick(data, [
      'image',
      'sort',
      'playlet_id',
      'enabled',
    ]);
    if (isEdit) {
      payload.id = data.id;
    }
    updateData(payload).then(() => {
      setPending(false);
      message.success('success');
      dispatch(increase('refreshCount'));
      onCancel();
    }).catch((err) => {
      setPending(false);
      message.warning(err.message);
    });
  };
  const isEdit = !!data.id;
  const title = `${isEdit ? 'Edit' : 'Add'} banner`;
  const onSuccess = (url) => {
    dispatch(updateModal(['image', url]));
  };
  return (
    <Modal title={title} open={visible} onCancel={onCancel} onOk={onSubmit}>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-[120px]">ID：</div>
          <span>{data.id || 'Not set'}</span>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Image: </div>
          <div className="flex-1 flex items-ceter">
            <Input onChange={onChangeString('image')} value={data.image} className="flex-1 mr-2" />
            <Upload onSuccess={onSuccess} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Sorts：</div>
          <Input type="number" onChange={onChangeString('sort')} className="flex-1" value={data.sort} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Playlet ID：</div>
          <Input type="number" onChange={onChangeString('playlet_id')} className="flex-1" value={data.playlet_id} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Enabled: </div>
          <Switch onChange={onChangeBool('enabled')} checked={!!data.enabled} />
        </div>
      </div>
    </Modal>
  );
}
