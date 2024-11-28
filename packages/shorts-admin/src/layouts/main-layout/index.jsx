import { last } from '@/utils/array';

export default function MainLayout({ path, children }) {
  const title = last(path);
  const loc = ['Location: Home'].concat(path).join(' > ');
  return (
    <div className="p-4">
      <div className="flex items-center justify-between border-l-2 border-l-[#3D6FFF] h-6">
        <div className="text-[#333333] font-bold pl-2">{title}</div>
        <div className="flex items-center space-x-2">
          <div className="w-[6px] h-[6px] rounded-full bg-[#3D6FFF]" />
          <div className="text-[#888888]">{loc}</div>
        </div>
      </div>
      <div className="h-[calc(var(--fullscreen)-140px)] bg-white mt-7">{children}</div>
    </div>
  );
}
