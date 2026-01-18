import http from './https';

export const getUserFiles = async (folderId: string | null) => {
  try {
    const { data } = await http.get('/files/user', {
      withCredentials: true,
      params: { folderId },
    });
    console.log('User Files:', data);
    return data;
  } catch (error) {
    console.error('Error fetching user files:', error);
    throw error;
  }
};
