import React from "react";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  element: Question & {
    fieldOptions: Array<FieldOption>;
  };
  value: string;
  onChange: (
    value?:
      | string
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.FormEvent<HTMLButtonElement>
  ) => void;
};

export const FormField = ({ element, value, onChange }: Props) => {
  if (!element) return null;
  const components: { [key: string]: () => JSX.Element } = {
    Input: () => <Input type="text" onChange={onChange} />,
    Switch: () => <Switch />,
    Textarea: () => <Textarea onChange={onChange} />,
    Select: () => (
      <Select onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="select an option" />
        </SelectTrigger>
        <SelectContent>
          {element.fieldOptions.map((option, index) => (
            <SelectItem
              key={`${option.text} ${option.value}`}
              value={`answerId_${option._id}`}
            >
              {option.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    RadioGroup: () => (
      <RadioGroup onValueChange={onChange}>
        {element.fieldOptions.map((option, index) => (
          <div
            key={`${option.text} ${option.value}`}
            className="flex items-center space-x-2"
          >
            <FormControl>
              <RadioGroupItem
                value={`answerId_${option._id}`}
                id={option?.value?.toString() ?? `answerId_${option._id}`}
              >
                {option.text}
              </RadioGroupItem>
            </FormControl>
            <Label className="text-base">{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    ),
  };
  return element.fieldType && components[element.fieldType]
    ? components[element.fieldType]()
    : null;
};
