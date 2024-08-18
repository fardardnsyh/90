import { X } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

type Props = {
  isOpen: boolean;
  toggle: () => void;
};

const handleSignOut = async () => {
  await signOut();
};

const TopBar = ({ isOpen, toggle }: Props) => {
  return (
    <div
      className="fixed w-full h-full grid items-center top-0 left-0 ease-in-out delay-300 bg-background"
      style={{
        opacity: isOpen ? "100%" : "0",
        top: isOpen ? "0" : "-100%",
        zIndex: "1000",
      }}
    >
      <div className="absolute top-[1.2rem] right-[1.2rem] cursor-pointer text-[2rem] outline-none">
        <X className="dark:white light:black" onClick={toggle} />
      </div>
      <div>
        <ul className="grid grid-cols-1 grid-rows-6 text-center ">
          <Link
            className="flex items-center justify-center text-md decoration-none list-none delay-200 ease-in-out hover:text-brand"
            href="/dashboard"
            onClick={toggle}
          >
            Dashboard
          </Link>

          <Link
            className="flex items-center justify-center text-md decoration-none list-none delay-200 ease-in-out hover:text-brand"
            href="/results"
            onClick={toggle}
          >
            Results
          </Link>
          <Link
            className="flex items-center justify-center text-md decoration-none list-none delay-200 ease-in-out hover:text-brand"
            href="/settings"
            onClick={toggle}
          >
            Settings
          </Link>
          <span
            className="flex items-center justify-center text-md light:text-black dark:text-white decoration-none list-none delay-200 ease-in-out hover:text-brand cursor-pointer"
            onClick={() => handleSignOut()}
          >
            Sign Out
          </span>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;
