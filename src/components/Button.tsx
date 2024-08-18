import { Button } from "./ui/button";
type Props = {
  pending: boolean;
};

const CustomButton = ({ pending }: Props) => {
  return (
    <Button
      className="rounded-[50px] whitespace-nowrap px-[30px] py-[12px] outline-none border-none flex justify-center items-center transition-all delay-300 ease-in-out hover:bg-foreground hover:text-background"
      type="submit"
      disabled={pending}
    >
      {pending ? "Generating ..." : "Generate"}
    </Button>
  );
};

export default CustomButton;
