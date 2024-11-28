import { Popover, Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { resetColumns, updateByKey } from '../store';
import { columnsConfig } from '../column-config';
import { storeName } from '../config';

function ColumnPanel() {
  const dispatch = useDispatch();
  const { columns } = useSelector((state) => state[storeName]);
  const options = columnsConfig.map((t) => ({
    label: t.title,
    value: t.key,
  }));
  const onChange = (value) => dispatch(updateByKey(['columns', value]));
  const reset = () => dispatch(resetColumns());
  return (
    <div className="w-[200px]">
      <Checkbox.Group options={options} value={columns} onChange={onChange} />
      <div className="flex justify-end mt-2">
        <Button type="primary" size="small" onClick={reset}>Reset</Button>
      </div>
    </div>
  );
}

export default function TableColumns() {
  return (
    <Popover title="Table Columns" content={<ColumnPanel />} placement="bottom">
      <Button size="small">Columns</Button>
    </Popover>
  );
}
