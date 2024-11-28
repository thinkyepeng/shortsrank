import { Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { increase, updateByKey, resetSearch } from '../store';
import Sorts from './Sorts';
import Filters from './Filters';
import TableColumns from './TableColumns';
import { storeName } from '../config';

export default function SearcBox() {
  const dispatch = useDispatch();
  const {
    searchType, searchTypes, keyword, pending,
  } = useSelector((state) => state[storeName]);
  const onChange = (evt) => dispatch(updateByKey(['keyword', evt.target.value.trim()]));
  const onChangeType = (value) => dispatch(updateByKey(['searchType', value]));
  const onSearch = () => {
    dispatch(updateByKey(['page', 1]));
    dispatch(increase('refreshCount'));
  };
  const onReset = () => {
    dispatch(resetSearch());
    onSearch();
  };
  const onAdd = () => {
    dispatch(updateByKey(['modalData', {
      title: 'Real&Fake Daughters (1/12)',
      num: 1,
      link: 'https://d1nxv9tflddvrt.cloudfront.net/1-1shorts+drama/%E7%9C%9F%E5%81%87/27720bb9-4001-4c8e-a98b-5eced2bb06f9/AppleHLS1/Episode-1_Ott_Hls_Ts_Avc_Aac_16x9_1920x1080p_8.5Mbps_qvbr.m3u8',
      free: 1,
      playlet_id: ''
    }]));
    dispatch(updateByKey(['visible', true]));
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Input
          size="small"
          placeholder="Input a keyword"
          allowClear
          value={keyword}
          onChange={onChange}
          className="w-[120px]"
          onPressEnter={onSearch}
        />
        <Select size="small" options={searchTypes} value={searchType} onChange={onChangeType} className="w-[90px]" />
        <Filters />
        <Sorts />
        <TableColumns />
        <Button size="small" type="primary" onClick={onSearch} disabled={pending}>Search</Button>
        <Button size="small" type="primary" onClick={onAdd} disabled={pending}>Add</Button>
      </div>
      <Button size="small" type="primary" onClick={onReset} disabled={pending}>Reset</Button>
    </div>
  );
}
