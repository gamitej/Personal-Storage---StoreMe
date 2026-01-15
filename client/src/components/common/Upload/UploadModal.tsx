import Toast from '@/components/modals/Toast';
import { UploadFileItem } from './Upload.state';

type UploadModalProps = {
  files: UploadFileItem[];
  isToastOpen: boolean;
  setIsToastOpen: () => void;
  title?: string;
};

const StatusLabel = ({
  status,
}: {
  status: UploadFileItem['status'];
}) => {
  if (status === 'completed')
    return <span className="text-xs text-green-600">Completed</span>;

  if (status === 'error')
    return <span className="text-xs text-red-600">Failed</span>;

  if (status === 'uploading')
    return <span className="text-xs text-blue-600">Uploading…</span>;

  return <span className="text-xs text-gray-500">Pending</span>;
};


const FileItem = ({ file }: { file: UploadFileItem }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between text-xs font-medium">
        <span className="truncate max-w-45 text-(--dark-gray)">
          {file.file.name}
        </span>
        <span className='text-(--gray)'>{file.progress}%</span>
      </div>

      <div className="h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded transition-all ${
            file.status === 'error'
              ? 'bg-red-500'
              : file.status === 'completed'
              ? 'bg-green-500'
              : 'bg-blue-500'
          }`}
          style={{ width: `${file.progress}%` }}
        />
      </div>

      <StatusLabel status={file.status} />
    </div>
  );
};

const UploadModal = ({
  files,
  isToastOpen,
  setIsToastOpen,
  title = 'Uploading files',
}: UploadModalProps) => {
  return (
    <Toast title={title} isOpen={isToastOpen} onClose={setIsToastOpen}>
      <div className="flex flex-col gap-3 max-h-75 overflow-y-auto">
        {files.map(file => (
          <FileItem key={file.id} file={file} />
        ))}

        {!files.length && (
          <div className="text-sm text-gray-500 text-center">
            No files in upload queue
          </div>
        )}
      </div>
    </Toast>
  );
};





export default UploadModal;
