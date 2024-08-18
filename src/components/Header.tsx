import { Wrench } from "lucide-react";
import React from "react";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="border bottom-1 w-full">
      <nav className="border-gray-200 px-4 py-2.5 flex justify-center max-w-[1300px] mx-auto">
        <Link
          className="flex flex-wrap justify-between items-center mr-auto max-w-screen-xl"
          href="/"
        >
          <Wrench
            size={22}
            strokeWidth={1.5}
            className="dark:white light:black"
          />
          <h2 className="text-md font-bold text dark-white ml-2">
            AI Form Builder
          </h2>
        </Link>
        <div>
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
};

export default Header;
