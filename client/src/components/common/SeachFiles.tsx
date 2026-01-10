const SeachFiles = () => {
  return (
    <div className="flex items-center justify-center bg-white rounded-full gap-2 px-4 py-2 shadow-sm">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="9.16667"
          cy="9.16667"
          rx="6.66667"
          ry="6.66667"
          stroke="#333F4E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.75 14.1317L17.9167 18.2984"
          stroke="#333F4E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        placeholder="search files..."
        className="w-80 px-2 py-1 outline-none border-none caret-(--pink) text-(--dark-gray) placeholder:text-(--gray) bg-white"
      />
    </div>
  );
};

export default SeachFiles;
