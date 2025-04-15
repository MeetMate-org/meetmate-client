const NextStep = ({
  step,
  setCurrentStep,
  onClick, 
}: {
  step: "basics" | "attendees" | "date" | "confirmination";
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"basics" | "attendees" | "date" | "confirmination">
  >;
  onClick?: () => void; 
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); 
    }
    setCurrentStep(step); 
  };

  return (
    <button
      onClick={handleClick}
      className="mt-4 py-2 px-4 bg-colorPurple text-white font-montserrat rounded-md flex items-center justify-center gap-1"
    >
      Next
      <svg
        className="w-4 h-4 text-white -rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
};

export default NextStep;