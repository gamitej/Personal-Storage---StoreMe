import http from '@/services/https';

const CHUNK_SIZE = 1 * 1024 * 1024; // 1MB

type UploadChunkParams = {
  chunk: Blob;
  userId: string;
  fileId: string;
  chunkIndex: number;
  totalChunks: number;
  originalName: string;
};

export const uploadChunk = async ({
  chunk,
  userId,
  fileId,
  chunkIndex,
  totalChunks,
  originalName,
}: UploadChunkParams): Promise<void> => {
  const formData = new FormData();

  formData.append('file', chunk);
  formData.append('fileId', fileId);
  formData.append('chunkIndex', String(chunkIndex));
  formData.append('totalChunks', String(totalChunks));
  formData.append('originalName', originalName);
  formData.append('user_id', userId);

  try {
    await http.post('/files/upload', formData, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(`Chunk ${chunkIndex} upload failed`, error);
    throw error;
  }
};

export const uploadFile = async ({
  file,
  fileId,
  userId,
  onProgress,
}: {
  file: File;
  fileId: string;
  userId: string;
  onProgress?: (fileId: string, value: number) => void;
}) => {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  for (let i = 0; i < totalChunks; i++) {
    const chunkIndex = i + 1;
    const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);

    await uploadChunk({
      fileId,
      chunk,
      userId,
      chunkIndex,
      totalChunks,
      originalName: file.name,
    });

    const percentage = Math.round(((i + 1) / totalChunks) * 100);
    onProgress?.(fileId, percentage);
  }
};
