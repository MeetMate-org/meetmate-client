import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      author: "Alice, Team Lead at Alpha",
      comment:
        "Meet Mate transformed how our team organizes meetings. Scheduling has never been smoother!",
    },
    {
      author: "Bob, Product Manager at Product Hub Co.",
      comment:
        "Collaborative polling is a game-changer. Our cross-timezone team loves it.",
    },
    {
      author: "Carol, Marketing at Marketing Wizards",
      comment:
        "Syncing with calendars and Slack was effortless. Highly recommend Meet Mate!",
    },
    {
      author: "Dave, CEO at Startup X",
      comment:
        "In minutes we set up recurring team syncs—no more email back-and-forth.",
    },
  ];

  return (
    <section className="bg-gray-100 py-48">
      <div className="container mx-auto px-8 lg:px-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Trusted by Teams</h2>
        <p className="mt-6 text-gray-600">
          Teams of all sizes rely on Meet Mate to streamline their scheduling.
        </p>

        <div className="mt-16">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={32}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="py-12"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-8 bg-white rounded-xl shadow-lg flex flex-col justify-between min-h-[300px]">
                  <p className="text-gray-800 leading-relaxed">
                    “{t.comment}”
                  </p>
                  <p className="mt-6 font-semibold text-indigo-600">
                    {t.author}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};