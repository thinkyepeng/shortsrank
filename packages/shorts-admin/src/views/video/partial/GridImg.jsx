import { Popover } from 'antd';

function DetailCard({ src }) {
  return <img src={src} className="w-[300px]" alt="" />;
}

export default function GridImg({ url }) {
  const src = `${url}?x-oss-process=style/w-500`;
  return (
    <Popover placement="right" title="点击在新窗口中打开" content={<DetailCard src={src} />}>
      <img src={src} className="w-4 h-4" alt="" />
    </Popover>
  );
}
