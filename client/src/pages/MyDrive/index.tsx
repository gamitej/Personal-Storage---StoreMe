import { useQuery } from '@tanstack/react-query';
import { fileIcons, formatFileSize, getIconColor } from '@/utils';
import { getUserFiles } from '@/services/Mydrive.api';
import { FileIcon } from '@/components/common/FileSvgIcons';

type FileItem = {
  id: string;
  name: string;
  mime_type: string;
  size: string;
  storage_path: string;
};

const MyDrive = () => {
  // Fetch user files
  const {
    isLoading,
    isError,
    data = {},
    error,
  } = useQuery({
    queryKey: ['userFiles'],
    queryFn: () => getUserFiles(null),
  });

  const {files =[]} = data as {files:FileItem[]}; 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }


  /**
   * TSX
   */
  return (
    <section>
  <main className="bg-gray-100 rounded-2xl mb-4 p-4">
    check
  </main>

  <div className="grid grid-cols-12 gap-4">
    {files?.map((file: FileItem) => {

      const Icon = fileIcons[file.mime_type] || FileIcon;

      return <div
        key={file.id}
        className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-xl p-3 hover:shadow cursor-pointer"
      >
        <div className="flex items-center gap-3">

          <span className="text-2xl">
           <Icon className={`w-8 h-8 ${getIconColor(file.mime_type)}`} />
          </span>

          <div className="truncate">
            <p className="font-medium truncate">{file.name}</p>
            <p className="text-sm text-gray-500">
              {formatFileSize(Number(file.size))}
            </p>
          </div>
        </div>
      </div>
})}
  </div>
</section>

  );
};

export default MyDrive;
