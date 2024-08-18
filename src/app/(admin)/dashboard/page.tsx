"use client";
import { getUserForms } from "@/app/actions/getUserForms";
import FormList from "@/app/forms/FormList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
  const { data: session } = useSession();
  const [forms, setForms] = useState<FormDocument[] | null>(null);
  //@ts-ignore
  const userId = session?.user?.id;
  useEffect(() => {
    const getRequests = async () => {
      const response = await getUserForms(userId);
      console.log(response);
      setForms(response);
    };
    getRequests();
  }, [userId]);

  return !forms ? (
    <div className="py-2 px-4">
      <p className="text-muted-foreground text-sm">No forms created yet.</p>
    </div>
  ) : (
    <FormList forms={forms} />
  );
};

export default Dashboard;
