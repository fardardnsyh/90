import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import { generateForm } from "../actions/generateForm";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { navigate } from "../actions/navigateToForm";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MoveRight, ChevronRight, Lock } from "lucide-react";
import CustomButton from "@/components/Button";
import { getUserSubscription } from "../actions/userSubscription";
import { getUserForms } from "../actions/getUserForms";
import MAX_FREE_FORMS from "@/utils/free-forms";

export function SubmitButton() {
  // a Hook that gives you status information of the last form submission.
  const { pending } = useFormStatus();
  return <CustomButton pending={pending} />;
}

const UpgradeButton = () => {
  return (
    <Button
      disabled
      className="rounded-[50px] whitespace-nowrap px-[30px] py-[12px] outline-none border-none flex justify-center items-center transition-all delay-300 ease-in-out hover:bg-foreground hover:text-background"
    >
      <Lock className="w-4 h-4 mr-2" />
      Upgrade Plan
    </Button>
  );
};

const FormGenerator = () => {
  const { data: session } = useSession();
  const initialState: {
    message: string;
    data?: any;
  } = { message: "" };
  //@ts-ignore
  const [state, formAction] = useFormState(generateForm, initialState);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (state?.message === "success") {
      setOpen(false);
      console.log(state.data.formId);
      navigate(state.data.formId);
    }
  }, [state?.message]);

  const onFormCreate = () => {
    if (session?.user) {
      setOpen(true);
    } else {
      signIn();
    }
  };
  const [subscription, setSubscription] = useState<any>(null);
  const [forms, setForms] = useState<FormDocument[]>([]);
  //@ts-ignore
  const userId = session?.user?._id;
  useEffect(() => {
    const getRequests = async () => {
      const sub = await getUserSubscription(userId);
      const forms = await getUserForms(userId);
      setSubscription(sub);
      setForms(forms);
    };
    getRequests();
  }, [userId]);

  const [hover, setHover] = useState(false);
  const onHover = () => {
    setHover(!hover);
  };
  const userFormsCount = forms.length;
  if (!subscription && userFormsCount == MAX_FREE_FORMS) {
    return <UpgradeButton />;
  } else {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Button
          onClick={onFormCreate}
          className="rounded-[50px] whitespace-nowrap px-[30px] py-[12px] outline-none border-none flex justify-center items-center transition-all delay-300 ease-in-out hover:bg-foreground hover:text-background"
          onMouseEnter={onHover}
          onMouseLeave={onHover}
        >
          Create Form{" "}
          {hover ? (
            <MoveRight size={20} className="ml-2" />
          ) : (
            <ChevronRight size={20} className="ml-2" />
          )}
        </Button>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          <form action={formAction}>
            <div className="grid gap-4 py-4">
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Share what your form is about, who is it for, and what information you would like to collect. And AI will do the magic ✨"
              />
            </div>
            <DialogFooter>
              <SubmitButton />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
};
export default FormGenerator;
