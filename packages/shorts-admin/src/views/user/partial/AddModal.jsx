import {
  Modal, Switch, message, Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateData } from '@/api/user';
import { useState } from 'react';
import { increase, updateByKey, updateModal } from '../store';

export default function AddModal() {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const { modalData: data, visible } = useSelector((state) => state.user);
  const onCancel = () => dispatch(updateByKey(['visible', false]));
  const onChangeBool = (name) => (checked) => dispatch(updateModal([name, checked ? 1 : 0]));
  const onChangeValue = (name) => (evt) => {
    dispatch(updateModal([name, evt.target.value]));
  };
  const onSubmit = () => {
    if (pending) {
      return;
    }
    setPending(true);
    const payload = {
      isPro: data.isPro,
      id: data.id,
      htmlLen: data.htmlLen,
      cssLen: data.cssLen,
      jsLen: data.jsLen,
      collectTry: data.collectTry,
    };
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
  return (
    <Modal title="Edit用户资料" open={visible} onCancel={onCancel} onOk={onSubmit}>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-[120px]">是否会员：</div>
          <Switch onChange={onChangeBool('isPro')} checked={!!data.isPro} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Collect试用：</div>
          <Switch onChange={onChangeBool('collectTry')} checked={!!data.collectTry} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">htmlLen：</div>
          <Input onChange={onChangeValue('htmlLen')} value={data.htmlLen} className="w-[120px]" type="number" />
          <span className="ml-2">个字符</span>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">cssLen：</div>
          <Input onChange={onChangeValue('cssLen')} value={data.cssLen} className="w-[120px]" type="number" />
          <span className="ml-2">个字符</span>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">jsLen：</div>
          <Input onChange={onChangeValue('jsLen')} value={data.jsLen} className="w-[120px]" type="number" />
          <span className="ml-2">个字符</span>
        </div>
      </div>
    </Modal>
  );
}
