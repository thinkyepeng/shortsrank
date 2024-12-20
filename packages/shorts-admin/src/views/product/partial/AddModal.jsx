import {
  Modal, message, Input, Switch,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateData } from '@/api/product';
import { increase, updateByKey, updateModal } from '../store';
import { storeName } from '../config';
import { pick } from 'lodash'

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
      'coins',
      'description',
      'price',
      'product_id',
      'product_name',
      'enabled',
      'sort',
    ])
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
  const title = `${isEdit ? 'Edit' : 'Add'} category`;
  return (
    <Modal title={title} open={visible} onCancel={onCancel} onOk={onSubmit}>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-[120px]">ID：</div>
          <span>{data.id || 'Not set'}</span>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Product.ID：</div>
          <Input onChange={onChangeString('product_id')} value={data.product_id} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Product Name：</div>
          <Input onChange={onChangeString('product_name')} value={data.product_name} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Description：</div>
          <Input onChange={onChangeString('description')} value={data.description} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Price：</div>
          <Input type="number" onChange={onChangeString('price')} value={data.price} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Coins：</div>
          <Input type="number" onChange={onChangeString('coins')} value={data.coins} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Enabled：</div>
          <Switch onChange={onChangeBool('enabled')} checked={!!data.enabled} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Sorts：</div>
          <Input type="number" onChange={onChangeString('sort')} className="flex-1" value={data.sort} />
        </div>
      </div>
    </Modal>
  );
}
