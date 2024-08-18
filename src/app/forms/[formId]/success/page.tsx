import Header from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

const page = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return (
    <>
      <Header />
      <div className="w-full min-h-[90vh] flex items-center justify-center ">
        <Alert variant="default" className="w-[50%]">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your answers were recorded successfully. Thank you for submitting
            the form!.{" "}
            <Link href={baseUrl} className="underline">
              Visit AI Form Builder.
            </Link>
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default page;
