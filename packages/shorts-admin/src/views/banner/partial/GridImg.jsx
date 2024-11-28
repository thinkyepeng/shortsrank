import { Popover } from 'antd';

function DetailCard({ src }) {
  return <img src={src} className="w-[300px]" alt="" />;
}

export default function GridImg({ url }) {
  const src = `${url}?x-oss-process=style/w-500`;
  return (
    <Popover placement="right" title="View in new Window" content={<DetailCard src={src} />}>
      <img src={src} className="h-4" alt="" />
    </Popover>
  );
}
