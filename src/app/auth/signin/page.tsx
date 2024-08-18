"use client";
import { useEffect, useState } from "react";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaGoogle } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";

// Define the type for providers
type ProvidersType = Record<string, ClientSafeProvider> | null;

const SignIn = () => {
  const [providers, setProviders] = useState<ProvidersType>(null);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  const handleSignIn = async (providerId: string) => {
    // Clear current session and prompt for account selection for Google
    await signIn(providerId, {
      callbackUrl: `${window.location.origin}`,
      ...(providerId === "google" && { prompt: "select_account" }),
    });
  };
  if (providers != null) {
    return (
      <>
        <Header />
        <div className="w-full min-h-[90vh] flex items-center justify-center">
          <div className="rounded-xl border bg-card text-car-foreground shadow">
            <div className="flex flex-col p-6 space-y-1">
              <h3 className="font-bold tracking-tight text-2xl">
                Sign in with your account
              </h3>
              <p className="text-sm text-muted-foreground">Choose a provider</p>
            </div>
            <div className="p-6 pt-0 grid gap-4">
              <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                {providers &&
                  Object.values(providers).map((provider) => {
                    return provider.id === "google" ? (
                      <Button
                        key={provider.id}
                        onClick={() => handleSignIn(provider.id)}
                      >
                        <FaGoogle className="mr-2 h-4 w-4" /> Login with{" "}
                        {provider.id}
                      </Button>
                    ) : (
                      <Button
                        key={provider.id}
                        onClick={() => handleSignIn(provider.id)}
                      >
                        <GitHubLogoIcon className="mr-2 h-4 w-4" /> Login with{" "}
                        {provider.id}
                      </Button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <ClipLoader color="#3B82F6" size={50} aria-label="Please wait..." />
      </div>
    );
  }
};

export default SignIn;
