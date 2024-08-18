import Header from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Header />
      <div className="w-full min-h-[90vh] flex items-center justify-center ">
        <Alert variant="default" className="w-[50%]">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your account has been updated.{" "}
            <Link href="/dashboard" className="underline">
              Go to the dashboard
            </Link>{" "}
            to create more forms
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default page;
