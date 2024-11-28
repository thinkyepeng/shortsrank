import {
  Modal, message, Input, Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { pick } from 'lodash';
import { updateData } from '@/api/video';
import { increase, updateByKey, updateModal } from '../store';
import { storeName } from '../config';
import Upload from '@/components/upload';

export default function AddModal() {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const { modalData: data, visible } = useSelector((state) => state[storeName]);
  const onCancel = () => dispatch(updateByKey(['visible', false]));
  const onChangeString = (name) => (evt) => dispatch(updateModal([name, evt.target.value]));
  const onChangeBool = (name) => (checked) => dispatch(updateModal([name, checked ? 1 : 0]));
  const onSuccess = (url) => {
    dispatch(updateModal(['link', url]));
  };
  const onSubmit = () => {
    if (pending) {
      return;
    }
    setPending(true);
    const isEdit = !!data.id;
    const payload = pick(data, [
      'title',
      'num',
      'link',
      'free',
      'playlet_id',
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
  const title = `${isEdit ? 'Edit' : 'Add '} video`;
  return (
    <Modal title={title} open={visible} onCancel={onCancel} onOk={onSubmit}>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-[120px]">ID：</div>
          <span>{data.id || 'Not set'}</span>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Title</div>
          <Input onChange={onChangeString('title')} value={data.title} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Link</div>
          <div className="flex-1 flex items-ceter">
            <Input onChange={onChangeString('link')} value={data.link} className="flex-1 mr-2" />
            <Upload onSuccess={onSuccess} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Num</div>
          <Input type="number" onChange={onChangeString('num')} className="flex-1" value={data.num} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Free</div>
          <Input onChange={onChangeString('free')} value={data.free} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">PlayetId</div>
          <Input type="number" onChange={onChangeString('playlet_id')} value={data.playlet_id} className="flex-1" />
        </div>
      </div>
    </Modal>
  );
}
