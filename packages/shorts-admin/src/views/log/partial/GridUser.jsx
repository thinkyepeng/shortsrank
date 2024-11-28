import { Popover, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateByKey, increase } from '../store';

function DetailCard({ data }) {
  const dispatch = useDispatch();
  const onSearch = () => {
    dispatch(updateByKey(['searchType', 'username']));
    dispatch(updateByKey(['keyword', data.username]));
    dispatch(updateByKey(['page', 1]));
    dispatch(increase('refreshCount'));
  };
  return (
    <>
      <div className="flex items-center">
        <div>用户名：</div>
        <div>{data.username}</div>
      </div>
      <div className="flex items-center">
        <div>昵称：</div>
        <div>{data.nickname}</div>
      </div>
      <div className="flex items-center">
        <div>注册时间：</div>
        <div>{data.created}</div>
      </div>
      <div className="mt-2">
        <Button type="primary" size="small" onClick={onSearch}>搜索</Button>
      </div>
    </>
  );
}

export default function GridUser({ data }) {
  // eslint-disable-next-line no-undef
  const url = `${SITE_URL}/${data.username}`;
  return (
    <Popover placement="right" title="用户详情" content={<DetailCard data={data} />}>
      <div className="flex items-center space-x-2">
        {data.avatar ? <img src={data.avatar} className="w-5" alt="" /> : null}
        <a href={url} target="_blank" rel="noopener noreferrer">{data.username}</a>
      </div>
    </Popover>

  );
}
