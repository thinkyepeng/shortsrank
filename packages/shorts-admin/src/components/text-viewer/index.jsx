import { Popover } from 'antd';

function DetailCard({ value }) {
  return (
    <div className='w-[200px]'>
      {value}
    </div>
  );
}

export default function TextViewer({ value, length=20 }) {
  if (!value) {
    return null
  }
  const short = value.slice(0, length);
  const dot = short.length < value.length;
  const text = `${short}${dot ? '...' : ''}`;
  return (
    <Popover placement="right" title="Full text" content={<DetailCard value={value} />}>
      {text}
    </Popover>
  );
}
