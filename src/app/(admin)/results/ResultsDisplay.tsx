import getFormResults from "@/app/actions/getFormResults";
import React, { useEffect, useState } from "react";
import Table from "./Table";

type Form =
  | (FormDocument & {
      questions: Question[];
      submissions: FormSubmissionWithAnswers[];
    })
  | undefined;

type Props = {
  formId: { $oid: string } | string;
};

const ResultsDisplay = ({ formId }: Props) => {
  const [form, setForm] = useState<Form>(undefined);
  useEffect(() => {
    const getRequests = async () => {
      //@ts-ignore
      const form = await getFormResults(formId);
      console.log("FORM: ", form);
      setForm(form);
    };
    getRequests();
  }, [formId]);
  if (!form) return null;
  if (!form.submissions) {
    return (
      <div className="py-2 px-4">
        <p className="text-muted-foreground text-sm">
          No submissions on this form yet.
        </p>
      </div>
    );
  }
  return (
    <div>
      <Table data={form.submissions} columns={form.questions} />
    </div>
  );
};

export default ResultsDisplay;
