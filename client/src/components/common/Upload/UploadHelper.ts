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
    throw error; // 🔥 IMPORTANT for retry logic
  }
};

export const uploadFile = async ({
  file,
  userId,
  onProgress,
}: {
  file: any;
  userId: string;
  onProgress?: (percent: number) => void;
}) => {
  const fileId = `${Date.now()}-${file.name}`;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  const chunks = Array.from({ length: totalChunks }, (_, idx) => ({
    chunk: file.slice(idx * CHUNK_SIZE, (idx + 1) * CHUNK_SIZE),
    chunkIndex: idx + 1,
  }));

  for (let i = 0; i < totalChunks; i++) {
    const { chunk, chunkIndex } = chunks[i];

    await uploadChunk({
      fileId,
      chunk,
      userId,
      chunkIndex,
      totalChunks,
      originalName: file.name,
    });

    const totalPercentage = Math.round(((i + 1) / totalChunks) * 100);
    onProgress?.(totalPercentage);
  }
};
