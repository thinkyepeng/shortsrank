import { Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { increase, updateByKey, resetSearch } from '../store';
import Filters from './Filters';
import Sorts from './Sorts';
import TableColumns from './TableColumns';
import Overview from './Overview'
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
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Input
          size="small"
          placeholder="输入搜索词"
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
        <Button size="small" type="primary" onClick={onSearch} disabled={pending}>搜索</Button>
        <Overview />
      </div>
      <Button size="small" type="primary" onClick={onReset} disabled={pending}>重置</Button>
    </div>
  );
}
