import {
  Modal, message, Input,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { pick } from 'lodash';
import { updateData } from '@/api/playlet';
import { increase, updateByKey, updateModal } from '../store';
import { storeName } from '../config';
import CategoryEditor from '@/components/category-editor';
import Upload from '@/components/upload';

export default function AddModal() {
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const { modalData: data, visible, searchType, keyword, } = useSelector((state) => state[storeName]);
  const onCancel = () => dispatch(updateByKey(['visible', false]));
  const onChangeString = (name) => (evt) => dispatch(updateModal([name, evt.target.value]));
  const onChangeCategories = (v) => dispatch(updateModal(['categories', v]));
  const onSubmit = () => {
    if (pending) {
      return;
    }
    setPending(true);
    const isEdit = !!data.id;
    const payload = pick(data, [
      'title',
      'intro',
      'cover',
      'price',
      'categories',
      // 以下字段用于更新playlet在category中的sort字段
      'sort',
    ]);
    if (isEdit) {
      payload.id = data.id;
    }
    if (searchType === 'categoryId' && /^\d$/.test(keyword)) {
      payload.categoryId = parseInt(keyword, 10);
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
  const onSuccess = (url) => {
    dispatch(updateModal(['cover', url]));
  };
  const isEdit = !!data.id;
  const title = `${isEdit ? 'Edit' : 'Add'} playlet`;
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
          <div className="w-[120px]">Intro</div>
          <Input onChange={onChangeString('intro')} value={data.intro} className="flex-1" />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Cover</div>
          <div className="flex-1 flex items-ceter">
            <Input onChange={onChangeString('cover')} value={data.cover} className="flex-1 mr-2" />
            <Upload onSuccess={onSuccess} />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Price</div>
          <Input type="number" onChange={onChangeString('price')} className="flex-1" value={data.price} />
        </div>
        <div className="flex items-center">
          <div className="w-[120px]">Categories</div>
          <CategoryEditor categories={data.categories} onChange={onChangeCategories} />
        </div>
      </div>
    </Modal>
  );
}
