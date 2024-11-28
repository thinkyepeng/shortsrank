import { Popover, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { updateByKey, increase } from '../store';

function DetailCard({ data, name }) {
  const dispatch = useDispatch();
  const onSearch = () => {
    dispatch(updateByKey(['searchType', name]));
    dispatch(updateByKey(['keyword', data[name]]));
    dispatch(updateByKey(['page', 1]));
    dispatch(increase('refreshCount'));
  };
  return (
    <>
      <div className="flex items-center">
        <div>{name}：</div>
        <div>{data[name]}</div>
      </div>
      <div className="mt-2">
        <Button type="primary" size="small" onClick={onSearch}>Search</Button>
      </div>
    </>
  );
}

export default function GridItem({ data, name }) {
  // eslint-disable-next-line no-undef
  const url = `${SITE_URL}/${data.username}`;
  return (
    <Popover placement="right" title="详细信息" content={<DetailCard data={data} name={name} />}>
      <div className="flex items-center space-x-2">
        {data[name]}
      </div>
    </Popover>

  );
}