"use client";
import { getUserForms } from "@/app/actions/getUserForms";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import FormsPicker from "./FormsPicker";
import ResultsDisplay from "./ResultsDisplay";

type Props = {};

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data: session } = useSession();
  const [forms, setForms] = useState<FormDocument[]>([]);
  //@ts-ignore
  const userId = session?.user?.id;

  useEffect(() => {
    const getRequests = async () => {
      const forms = await getUserForms(userId);
      setForms(forms);
    };
    getRequests();
  }, [userId]);
  if (!forms?.length || forms.length === 0) {
    return (
      <div className="py-2 px-4">
        <p className="text-muted-foreground text-sm">No forms found.</p>
      </div>
    );
  }
  const selectOptions = forms.map((form) => {
    return {
      label: form.name,
      value: form._id,
    };
  });
  return (
    <div>
      <FormsPicker options={selectOptions} />
      <ResultsDisplay
        formId={
          searchParams?.formId ? (searchParams.formId as string) : forms[0]._id
        }
      />
    </div>
  );
};

export default Page;
