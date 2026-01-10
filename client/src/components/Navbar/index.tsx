import Logout from '../common/Logout';
import SeachFiles from '../common/SeachFiles';
import Upload from '../common/Upload';

const Navbar = () => {
  /**
   * TSX
   */
  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="h1 text-(--dark-gray) text-lg font-bold">
        StoreMe<span className="text-(--skyblue) font-bold">.</span>{' '}
      </h1>
      <SeachFiles />
      <div className="flex gap-4 items-center justify-center">
        <Upload />
        <Logout />
      </div>
    </div>
  );
};

export default Navbar;
