"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type Props = {};

const ManageSubscription = (props: Props) => {
  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    const response = await fetch("/api/stripe/create-portal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { url } = await response.json();
    router.push(url.url);
  };

  return (
    <Button onClick={redirectToCustomerPortal}>Change your Subscription</Button>
  );
};

export default ManageSubscription;
