"use client";
import getUserForm from "@/app/actions/getUserForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Wrench } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Form from "../../Form";
import Header from "@/components/Header";

const Page = ({ params }: { params: { formId: string } }) => {
  const formId = params.formId;
  const { data: session, status } = useSession();
  const [form, setForm] = useState<FormDocument>();
  //@ts-ignore
  const userId = session?.user?.id;
  useEffect(() => {
    const getRequests = async () => {
      const response = await getUserForm(formId);
      setForm(response);
    };
    getRequests();
  }, [userId]);

  return (
    <>
      <Header />
      {status === "loading" && (
        <div className="min-h-screen w-full flex items-center justify-center">
          <ClipLoader color="#3B82F6" size={50} aria-label="Please wait..." />
        </div>
      )}
      {status !== "loading" && (!formId || !form) && (
        <div className="w-full min-h-[90vh] flex items-center justify-center ">
          <Alert variant="default" className="w-[50%]">
            <AlertTitle>Fail</AlertTitle>
            <AlertDescription>
              Form Not Found.
              <Link href="/dashboard" className="underline">
                {" "}
                Go back to dashboard
              </Link>{" "}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {status !== "loading" && userId !== form?.userId && (
        <div className="w-full min-h-[90vh] flex items-center justify-center ">
          <Alert variant="default" className="w-[50%]">
            <AlertTitle>Unauthorized</AlertTitle>
            <AlertDescription>
              You are not authorized to view this page.
              <Link href="/dashboard" className="underline">
                {" "}
                Go back to dashboard
              </Link>{" "}
            </AlertDescription>
          </Alert>
        </div>
      )}
      {status !== "loading" && userId === form?.userId && form && (
        <Form form={form as FormModel} editMode={true} />
      )}
    </>
  );
};

export default Page;
