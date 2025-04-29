import Header from "../ui/components/header";

export default function CalendarLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
}
