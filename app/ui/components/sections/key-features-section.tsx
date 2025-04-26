import Image from "next/image";
import featureImg1 from "@/public/images/meetmate5.jpg";
import featureImg2 from "@/public/images/meetmate4.jpg";
import featureImg3 from "@/public/images/meetmate3.jpg";
import featureImg4 from "@/public/images/meetmate2.jpg";
import { IconArrow } from "../../svg/icon-arrow";

export const KeyFeaturesSection: React.FC = () => {
  const features = [
    {
      id: "01",
      img: featureImg1,
      items: [
        "Instant scheduling",
        "Smart defaults",
        "One-click invites",
        "Recurring events",
      ],
    },
    {
      id: "02",
      img: featureImg2,
      items: [
        "Time zone detection",
        "Auto-adjust slots",
        "Cross-region teams",
        "Local times display",
      ],
    },
    {
      id: "03",
      img: featureImg3,
      items: [
        "Poll-based voting",
        "Real-time tallies",
        "Multiple options",
        "Deadline reminders",
      ],
    },
    {
      id: "04",
      img: featureImg4,
      items: [
        "Calendar sync",
        "Slack notifications",
        "Email integration",
        "Browser extension",
      ],
    },
  ];

  return (
    <section className="py-32 bg-gray-100">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-12">
        <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
          <p className="text-sm text-indigo-600 font-semibold uppercase mb-2">
            Features
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Meet Mate Core Features
          </h2>
          <p className="text-gray-600">
            Everything you need to schedule, vote on, and manage team meetings
            seamlessly in one place.
          </p>
        </div>

        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 auto-rows-fr">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className={`bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col ${
                idx % 2 === 0 ? "mt-8" : ""
              }`}
            >
              <div className="h-40 relative">
                <Image
                  src={feature.img}
                  alt={feature.items[0]}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {feature.id}
                </span>
                <ul className="text-gray-700 space-y-1 flex-1">
                  {feature.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <button
                  onClick={() => window.openAuthModal && window.openAuthModal()}
                  className="mt-4 inline-flex items-center text-indigo-600 font-semibold hover:underline"
                >
                  Learn more
                  <IconArrow
                    direction="down"
                    className="w-4 h-4 -rotate-90"
                    strokeWidth={3}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
