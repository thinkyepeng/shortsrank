export default function UrlViewer({ url, length = 20 }) {
  if (!url) {
    return null;
  }
  const short = url.slice(0, length);
  const dot = short.length < url.length;
  const text = `${short}${dot ? '...' : ''}`;
  return <a href={url} target="_blank" rel="noopener noreferrer">{text}</a>;
}
