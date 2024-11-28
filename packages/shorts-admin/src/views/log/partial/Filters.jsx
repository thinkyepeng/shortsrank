import { Radio, Popover, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { increase, updateFilters } from '../store';
import { storeName } from '../config';

function FilterSelect({ data, index, value }) {
  const dispatch = useDispatch();
  const onChange = (evt) => {
    dispatch(updateFilters([index, evt.target.value]));
    dispatch(increase('refreshCount'));
  };
  return (
    <Radio.Group value={value} onChange={onChange} size="small">
      <Radio.Button value="">全部</Radio.Button>
      {data.map((item) => (
        <Radio.Button
          value={item.value}
          key={item.value}
        >
          {item.label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
}

function FiltersPanel() {
  const { filters } = useSelector((state) => state[storeName]);
  return (
    <>
      {filters.map((item, index) => (
        <div key={item.name} className="flex my-2">
          <div className="w-10 font-semibold">{item.label}</div>
          <div className="w-[200px]">
            <FilterSelect data={item.options} index={index} value={item.value} />
          </div>
        </div>
      ))}
    </>
  );
}

export default function Filters() {
  const { filters } = useSelector((state) => state[storeName]);
  const count = filters.filter((t) => t.value !== '').length;
  const text = count > 0 ? `筛选(${count})` : '筛选';
  return (
    <Popover title="筛选条件" content={<FiltersPanel />} placement="bottom">
      <Button size="small">{text}</Button>
    </Popover>
  );
}