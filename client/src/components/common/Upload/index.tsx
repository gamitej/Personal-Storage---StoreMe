import UploadModal from './UploadModal';
import { useSelector } from 'react-redux';
import { uploadFile } from './UploadHelper';
import { getUserInfo } from '@/redux/global/globalSlice';
import { ChangeEvent, useReducer, useRef } from 'react';
import { uploadInitialState, uploadStateReducer } from './Upload.state';

const Upload = () => {
  const { userId } = useSelector(getUserInfo);
  const fileRef = useRef<HTMLInputElement>(null);

  const [uploadState, dispatch] = useReducer(
    uploadStateReducer,
    uploadInitialState,
  );

  // For opening file dialog
  const handleClick = () => {
    fileRef.current?.click();
  };

  // For handling file upload
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files && files.length > 0) {
      dispatch({ type: 'SET_FILE', payload: files as [] });
      dispatch({ type: 'TOGGLE_TOAST', payload: true });

      await uploadFile({
        file: files[0],
        userId: userId as string,
        onProgress: (per) => dispatch({ type: 'SET_PROGRESS', payload: per }),
      });
    }
    return;
  };

  /**
   * TSX
   */
  return (
    <>
      <div
        onClick={handleClick}
        className="bg-(--pink) text-white px-4 py-2 rounded-full flex items-center gap-2 cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_80002_4015)">
            <path
              d="M15.6273 17.2763H11.3363V12.9403H12.7544C13.114 12.9403 13.3265 12.5317 13.114 12.2374L10.3555 8.42053C10.1798 8.17533 9.8161 8.17533 9.64038 8.42053L6.8819 12.2374C6.66939 12.5317 6.87781 12.9403 7.24152 12.9403H8.65958V17.2763H3.8537C1.70821 17.1578 0 15.1512 0 12.9771C0 11.4773 0.813241 10.1696 2.0188 9.46262C1.90846 9.16429 1.85125 8.84554 1.85125 8.51043C1.85125 6.97794 3.0895 5.73969 4.62199 5.73969C4.953 5.73969 5.27176 5.79691 5.57009 5.90724C6.45689 4.02739 8.36943 2.72375 10.5926 2.72375C13.4696 2.72784 15.8398 4.93054 16.1095 7.73806C18.3204 8.11812 20 10.1655 20 12.4826C20 14.9591 18.0711 17.1046 15.6273 17.2763Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_80002_4015">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        Upload
      </div>
      <input
        multiple
        type="file"
        ref={fileRef}
        className="hidden"
        onChange={handleFileUpload}
      />
      <UploadModal
        files={uploadState.files}
        isToastOpen={uploadState.isToastOpen}
        setIsToastOpen={() =>
          dispatch({ type: 'TOGGLE_TOAST', payload: false })
        }
      />
    </>
  );
};

export default Upload;
