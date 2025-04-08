"use client";

import React from "react";
import { AuthLayoutProps } from "@/app/types/auth-ui";
import { IconLogo } from "../../svg/icon-logo";

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  pageProps,
}) => {
  const { pageTitle, pageSubtitle } = pageProps;

  return (
    <section className="flex flex-col lg:flex-row w-full min-h-[100vh]">
      <div className="relative w-full lg:w-1/2 flex flex-col justify-center p-8 bg-[#21334C]">
        <div
          className="hidden lg:block absolute inset-0 bg-[url('/images/Group.png')] bg-cover bg-center opacity-100 filter"
          style={{ filter: "saturate(1.5)" }}
        />
        <div className="absolute inset-0 bg-[#21334C]/90" />

        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <IconLogo color="#ffffff" width={100} height={100} />
            <span className="text-5xl font-400 text-white font-encodesanssc">
              MeetMate
            </span>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-white">{pageTitle}</h2>
            {pageSubtitle && (
              <p className="text-white text-opacity-70 mt-2 max-w-md">
                {pageSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full lg:w-1/2 bg-white lg:rounded-l-[32px] rounded-t-[32px] p-8">
        {children}
      </div>
    </section>
  );
};
