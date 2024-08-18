"use client";
import { Menu, Wrench } from "lucide-react";
import ThemeToggler from "@/components/ThemeToggler";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import TopBar from "./TopBar";

type Props = {};

const handleSignOut = async () => {
  await signOut();
};

export const Header: React.FC = (props: Props) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="border bottom-1 w-full">
      <TopBar isOpen={isOpen} toggle={toggle} />
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
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden max-md:flex mx-2"
              size="icon"
            >
              <Menu
                className="dark:white light:black self-center"
                onClick={toggle}
              />
            </Button>
            <Link href="/dashboard" className="hidden md:flex">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Button
              variant="outline"
              className="hidden md:flex"
              onClick={handleSignOut}
            >
              Sign out
            </Button>
            {session.user.name && session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={32}
                height={32}
                className="hidden md:flex rounded-full mr-3"
              />
            )}
          </div>
        ) : (
          <Link href={"/api/auth/signin"}>
            <Button variant="ghost" className="mx-2">
              Sign in
            </Button>
          </Link>
        )}
        <div>
          <ThemeToggler />
        </div>
      </nav>
    </header>
  );
};
