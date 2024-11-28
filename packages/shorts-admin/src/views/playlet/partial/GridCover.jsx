import { Popover } from 'antd';

function DetailCard({ data }) {
  return (
    <div>
      <div className="max-w-[200px] break-words">{data.title}</div>
      <img src={data.cover} alt="" className="w-[200px]" />
    </div>
  );
}

export default function GridCover({ value, data }) {
  if (!value) {
    return null
  }
  return (
    <Popover placement="right" title="查看大图" content={<DetailCard data={data} />}>
      <div className="inline-flex items-center space-x-2">
        <img src={value} className='h-6' />
      </div>
    </Popover>
  );
}
