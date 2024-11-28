export default function TableView({ header, pagination, children }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-3 overflow-x-scroll">{header}</div>
      <div className="flex-1 overflow-y-scroll">{children}</div>
      <div className="p-4">{pagination}</div>
    </div>
  );
}
