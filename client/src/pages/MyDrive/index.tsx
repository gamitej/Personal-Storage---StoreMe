import { getUserFiles } from "@/services/Mydrive.api";
import { useQuery } from "@tanstack/react-query";

const MyDrive = () => {

  // Fetch user files
  const { isLoading, isError, data, error } = useQuery({
  queryKey: ['userFiles'],
  queryFn: () => getUserFiles(null)
});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  console.log('Fetched User Files in MyDrive:', data);

  /**
   * TSX
   */
  return (
    <section>
      <main className="bg-gray-100 rounded-2xl">check</main>
    </section>
  );
};

export default MyDrive;
