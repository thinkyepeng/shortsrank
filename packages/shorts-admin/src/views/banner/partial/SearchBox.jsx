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
      title: '',
      image: '',
      sort: 0,
      enabled: 1,
      playlet_id: 1,
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
