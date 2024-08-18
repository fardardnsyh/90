"use client";
import { Provider } from "@/components/Provider";
import { Header } from "@/components/Navbar";
import LandingPage from "./landing-page";

export default function Home() {
  return (
    <Provider>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <LandingPage />
      </main>
    </Provider>
  );
}
