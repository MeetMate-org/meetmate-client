import { IconArrow } from "../../svg/icon-arrow";

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
      <IconArrow direction="down" className="w-4 h-4 text-white -rotate-90" strokeWidth={3} />
    </button>
  );
};

export default NextStep;
