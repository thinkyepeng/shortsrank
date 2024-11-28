import AddModal from './AddModal';
import SearcBox from './SearchBox';

export default function Header() {
  return (
    <div className="space-x-2">
      <SearcBox />
      <AddModal />
    </div>
  );
}
