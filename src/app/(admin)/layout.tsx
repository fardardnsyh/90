"use client";
import DashboardNav from "@/components/DashboardNav";
import { Header } from "@/components/Navbar";
import UpgradePlanBtn from "@/components/UpgradePlanBtn";
import { SidebarNavItem } from "@/types/nav-types";
import { SessionProvider } from "next-auth/react";
import React from "react";
import FormGenerator from "../form-generator";

type Props = {
  children: React.ReactNode;
};

const dashboardConfig: { sidebarNav: SidebarNavItem[] } = {
  sidebarNav: [
    {
      title: "My Forms",
      href: "/dashboard",
      icon: "library",
    },
    {
      title: "Results",
      href: "/results",
      icon: "list",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
};

const layout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Header />
      <div className="size-full flex min-h-screen flex-col space-y-6 my-4">
        <div className="h-full container relative">
          <div className="overflow-hidden max-sm:overflow-auto rounded-[0.5rem] border bg-background shadow max-sm:border-none">
            <div className="flex-row md:flex">
              <aside className="flex flex-col border-r-[1px] p-4 max-sm:hidden">
                {/* Side Navigation */}
                <DashboardNav items={dashboardConfig.sidebarNav} />
                {/* UpgradePlanBtn */}
                <div className="flex items-center justify-center pt-5">
                  <UpgradePlanBtn />
                </div>
              </aside>
              <main className="flex flex-1 flex-col overflow-hidden py-4">
                <div className="flex flex-col items-start px-4 py-8 border-b-[1px] max-sm:py-0 max-sm:pb-4 max-sm:border-none">
                  <h1 className="text-3xl font-bold mb-2 max-sm:mb-4">
                    Dashboard
                  </h1>
                  <FormGenerator />
                </div>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default layout;
