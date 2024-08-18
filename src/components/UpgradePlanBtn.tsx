import { getUserForms } from "@/app/actions/getUserForms";
import { getUserSubscription } from "@/app/actions/userSubscription";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import SubscribeBtn from "@/app/stripe-subscription/SubscribeBtn";
import { ClipLoader } from "react-spinners";
import MAX_FREE_FORMS from "@/utils/free-forms";

type Props = {};

const UpgradePlanBtn = (props: Props) => {
  const { data: session } = useSession();
  const [subscription, setSubscription] = useState(null);
  const [forms, setForms] = useState<any[] | undefined>([]);
  const [loaded, setLoaded] = useState(false);
  // @ts-ignore
  const userId = session?.user?.id;

  useEffect(() => {
    const handleRequests = async () => {
      if (userId) {
        const sub = await getUserSubscription(userId);
        const fms = await getUserForms(userId);
        setSubscription(sub);
        setForms(fms);
        setLoaded(true);
      }
    };
    handleRequests();
  }, [userId]);

  if (subscription) {
    return (
      <div className="h-full flex items-center justify-center m-4 text-left text-sm max-sm:h-[2rem] max-sm:justify-start">
        <p className="text-brand">Subscribed to Gold Plan.</p>
      </div>
    );
  }
  const formCount = forms ? forms.length : 0;
  const percentage = formCount ? (formCount / MAX_FREE_FORMS) * 100 : 0;
  if (!userId || !loaded) {
    return (
      <div className="h-full flex items-center justify-center max-sm:h-[2rem">
        <ClipLoader color="#3B82F6" size={25} aria-label="Please wait..." />
      </div>
    );
  }

  return (
    <div className="h-full m-4 text-left text-xs">
      <Progress value={percentage} />
      <p className="my-2">
        {formCount} out of {MAX_FREE_FORMS} generated.
      </p>
      <div className="my-4">
        <SubscribeBtn price="price_1PEWfoBf1otR0ufwptHXU4BX" userId={userId} />
      </div>
    </div>
  );
};

export default UpgradePlanBtn;
