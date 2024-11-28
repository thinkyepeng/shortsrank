import { Radio, Popover, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { increase, updateSorts } from '../store';
import { storeName } from '../config';

function SortSelect({ data, index, value }) {
  const dispatch = useDispatch();
  const onChange = (evt) => {
    dispatch(updateSorts([index, evt.target.value]));
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

function SortsPanel() {
  const { sorts } = useSelector((state) => state[storeName]);
  return (
    <>
      {sorts.map((item, index) => (
        <div key={item.name} className="flex my-2">
          <div className="w-20 font-semibold">{item.label}</div>
          <div className="w-[160px]">
            <SortSelect data={item.options} index={index} value={item.value} />
          </div>
        </div>
      ))}
    </>
  );
}

export default function Sorts() {
  const { sorts } = useSelector((state) => state[storeName]);
  const count = sorts.filter((t) => t.value !== '').length;
  const text = count > 0 ? `排序(${count})` : '排序';
  return (
    <Popover title="列表排序" content={<SortsPanel />} placement="bottom">
      <Button size="small">{text}</Button>
    </Popover>
  );
}
