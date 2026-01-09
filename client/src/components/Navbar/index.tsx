import Upload from '../common/Upload';

const Navbar = () => {
  /**
   * TSX
   */
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2>StoreMe</h2>
      <input placeholder="search files..." />
      <div className="flex gap-4 items-center justify-center">
        <Upload />
        <div>logout</div>
      </div>
    </div>
  );
};

export default Navbar;
