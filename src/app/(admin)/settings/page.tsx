"use client";
import getUser from "@/app/actions/getUser";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import ManageSubscription from "./ManageSubscription";
import SubscribeBtn from "@/app/stripe-subscription/SubscribeBtn";

type Props = {};

const Settings = (props: Props) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  //@ts-ignore
  const userId = session?.user?.id;
  useEffect(() => {
    const getRequests = async () => {
      const user = await getUser(userId);
      setUser(user);
    };
    getRequests();
  }, [userId]);
  //@ts-ignore
  if (!session || !session.user || !session.user.id) {
    return null;
  }
  const plan = user?.subscribed ? "Gold Plan" : "Free Plan";
  return (
    <div className="py-2 px-4">
      <h1 className="text-4xl mb-3 capitalize">Subscription details</h1>
      <p className="text-foreground text-sm">You are currently on a {plan}.</p>
      <div className="my-2">
        {user?.subscribed ? (
          <ManageSubscription />
        ) : (
          <SubscribeBtn
            price="price_1PEWfoBf1otR0ufwptHXU4BX"
            userId={userId}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
