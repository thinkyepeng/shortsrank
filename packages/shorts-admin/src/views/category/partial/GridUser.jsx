export default function GridUser({ data }) {
  if (!data.username) {
    return <span>System</span>;
  }
  // eslint-disable-next-line no-undef
  const url = `${SITE_URL}/${data.username}`;
  return (
    <div className="flex items-center space-x-2">
      {data.avatar ? <img src={data.avatar} className="w-5" alt="" /> : null}
      <a href={url} target="_blank" rel="noopener noreferrer">{data.username}</a>
    </div>
  );
}
