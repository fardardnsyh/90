import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type Props = {
  forms: FormDocument[] | null;
};

const FormList = ({ forms }: Props) => {
  return (
    <div className="grid grid-cols1 md:grid-cols-3 m-5 p-4 gap-4">
      {forms?.map((form: FormDocument) => {
        const formattedDate = formatDistanceToNow(new Date(form.createdAt!), {
          addSuffix: true,
        });
        return (
          <div
            key={form._id.toString()}
            className="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-muted"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-md">{form.name}</p>
                  <p className="ml-auto text-xs text-foreground">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
            <div className="mine-clamp-2 text-xs text-muted-foreground">
              {form.description}
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/forms/edit/${form._id}`}>
                <Button variant="ghost">View</Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FormList;
