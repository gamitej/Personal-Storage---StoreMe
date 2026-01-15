export type UploadFileItem = {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
};

export type UploadState = {
  files: UploadFileItem[];
  isToastOpen: boolean;
};

export const uploadInitialState: UploadState = {
  files: [],
  isToastOpen: false,
};

export type UploadAction =
  | { type: 'ADD_FILES'; payload: UploadFileItem[] }
  | { type: 'SET_PROGRESS'; payload: { id: string; progress: number } }
  | {
      type: 'SET_STATUS';
      payload: { id: string; status: UploadFileItem['status'] };
    }
  | { type: 'TOGGLE_TOAST'; payload: boolean };

export const uploadStateReducer = (
  state: UploadState,
  action: UploadAction,
): UploadState => {
  const { payload, type } = action;
  switch (type) {
    case 'ADD_FILES':
      return {
        ...state,
        files: [...state.files, ...payload],
      };

    case 'SET_PROGRESS':
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === payload.id
            ? { ...file, progress: payload.progress }
            : file,
        ),
      };

    case 'SET_STATUS':
      return {
        ...state,
        files: state.files.map((file) =>
          file.id === payload.id ? { ...file, status: payload.status } : file,
        ),
      };

    case 'TOGGLE_TOAST':
      return { ...state, isToastOpen: payload };

    default:
      return state;
  }
};
