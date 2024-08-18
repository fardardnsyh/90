import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useCallback } from "react";

type SelectProps = {
  value: { $oid: string };
  label?: string | null;
};

type FormsPickerProps = {
  options: Array<SelectProps>;
};

const FormsPicker = ({ options }: FormsPickerProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const formId = searchParams.get("formId") ?? options[0].value.toString();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log("searchParams", searchParams);
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="flex gap-2 p-4 items-center">
      <Label className="font-bold">Select a form</Label>
      <Select
        value={formId}
        onValueChange={(value) => {
          router.push(pathname + "?" + createQueryString("formId", value));
        }}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={options[0].label} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value.$oid}
                value={option.value.toString()}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormsPicker;
