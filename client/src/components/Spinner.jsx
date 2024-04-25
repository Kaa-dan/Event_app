const Spinner = ({ size = 6 }) => {
  return (
    <svg
      className={`animate-spin h-${size} w-${size} text-blue-500`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.004 8.004 0 014 12H0c0 6.627 5.373 12 12 12v-4c-2.056 0-3.963-.524-5.657-1.436l1.414-1.415z"
      ></path>
    </svg>
  );
};

export default Spinner;
