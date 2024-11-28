import { Radio, Popover, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { increase, updateSorts } from '../store';

function SortSelect({ data, index, value }) {
  const dispatch = useDispatch();
  const onChange = (evt) => {
    dispatch(updateSorts([index, evt.target.value]));
    dispatch(increase('refreshCount'));
  };
  return (
    <Radio.Group value={value} onChange={onChange} size="small">
      <Radio.Button value="">All</Radio.Button>
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
  const { sorts } = useSelector((state) => state.user);
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
  const { sorts } = useSelector((state) => state.user);
  const count = sorts.filter((t) => t.value !== '').length;
  const text = count > 0 ? `Sorts(${count})` : 'Sorts';
  return (
    <Popover title="Sorts" content={<SortsPanel />} placement="bottom">
      <Button size="small">{text}</Button>
    </Popover>
  );
}
