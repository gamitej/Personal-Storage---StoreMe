import Toast from '@/components/modals/Toast';

const UploadModal = ({
  files = [],
  setIsToastOpen,
  isToastOpen = false,
  title = 'Uploading files',
}: any) => {
  const handleClose = () => {
    setIsToastOpen(false);
  };

  /**
   * TSX
   */
  return (
    <Toast title={title} isOpen={isToastOpen} onClose={handleClose}>
      <div className="flex flex-col gap-1">
        {files.map((file: any, idx: number) => {
          const isLengh = file.name.length > 25;

          return (
            <p key={idx} className="text-(--dark-gray)">
              {file.name.slice(0, 25)}
              {isLengh ? '...' : ''}
            </p>
          );
        })}
      </div>
    </Toast>
  );
};

export default UploadModal;
