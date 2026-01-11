export type FileItem = {
  id: string;
  name: string;
  size: number;
  status: 'uploading' | 'completed' | 'error';
};

type Action =
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'TOGGLE_TOAST'; payload: boolean }
  | { type: 'ADD_FILE'; payload: FileItem }
  | { type: 'SET_FILE'; payload: FileItem[] }
  | {
      type: 'UPDATE_FILE_STATUS';
      payload: { id: string; status: FileItem['status'] };
    };

type UploadInitialStateType = {
  files: FileItem[];
  progress: number;
  isToastOpen: boolean;
};

export const uploadInitialState: UploadInitialStateType = {
  files: [],
  progress: 0,
  isToastOpen: false,
};

export const uploadStateReducer = (
  state: UploadInitialStateType,
  action: Action,
): UploadInitialStateType => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_PROGRESS':
      return { ...state, progress: payload };

    case 'TOGGLE_TOAST':
      return { ...state, isToastOpen: payload };

    case 'SET_FILE':
      return { ...state, files: payload };

    case 'ADD_FILE':
      return {
        ...state,
        files: [...state.files, payload],
      };

    case 'UPDATE_FILE_STATUS':
      return {
        ...state,
        files: state.files.map((f) =>
          f.id === payload.id ? { ...f, status: payload.status } : f,
        ),
      };

    default:
      return state;
  }
};
