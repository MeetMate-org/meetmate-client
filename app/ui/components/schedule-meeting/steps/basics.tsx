import { MeetingData } from "@/app/types/meeting-data";
import NextStep from "../next-step";

const Basics = ({
  setCurrentStep,
  setMeetingData,
  meetingData
}: {
  setCurrentStep: React.Dispatch<
    React.SetStateAction<"basics" | "attendees" | "date" | "confirmination">
  >;
  setMeetingData: React.Dispatch<React.SetStateAction<MeetingData>>;
  meetingData: MeetingData
}) => {
  return (
    <div className="w-full flex flex-col items-end">
      <div className="w-full mt-4">
        <label>Meeting title *</label>
        <input
          className="w-full border border-colorGray rounded-md py-2 px-4 mt-2 focus:outline-none"
          type="text"
          placeholder="Add title for your meeting"
          value={meetingData.title}
          onChange={(e) => {
            setMeetingData((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
        />
      </div>

      <div className="w-full mt-4">
        <label>Meeting description</label>
        <textarea
          className="w-full border border-colorGray rounded-md py-2 px-4 mt-2 min-h-[100px] focus:outline-none resize-none"
          placeholder="Add description for your meeting"
          value={meetingData.description}
          onChange={(e) => {
            setMeetingData((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        ></textarea>
      </div>

      <div className="w-full mt-4">
        <label>Duration</label>
        <div className="relative">
          <select
            className="w-full border border-colorGray rounded-md py-2 px-4 mt-2 focus:outline-none appearance-none"
            value={meetingData.duration}
            onChange={(e) => {
              setMeetingData((prev) => ({
                ...prev,
                duration: parseInt(e.target.value),
              }));
            }}
          >
            <option value="">Select duration</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
          </select>
        </div>
      </div>
  
      <NextStep step="attendees" setCurrentStep={setCurrentStep} onClick={() => setCurrentStep("attendees")} />
    </div>
  );
};

export default Basics;