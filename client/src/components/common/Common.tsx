export const Spinner = ({ color = '#3b82f6' }: { color?: string }) => {
  return (
    <div className="flex justify-center items-center h-20">
      <div
        style={{
          border: `4px solid ${color}`,
          borderTop: '4px solid transparent',
        }}
        className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
};
