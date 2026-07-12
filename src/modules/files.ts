export const FilesModule = {
  postFile() {
    return {
      mutationFn: async (file: File) => ({
        name: file.name,
        size: file.size,
      }),
    };
  },
};
