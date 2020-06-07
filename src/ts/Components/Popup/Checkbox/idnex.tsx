import * as React from "react";
import { cn } from "@bem-react/classname";
import "./checkbox.scss";

interface CheckboxProps {
  onChange: (newValue: boolean) => void;
  text?: string;
  checked: boolean;
}
const checkbox = cn("checkbox");
export const Checkbox = (
  props: React.PropsWithChildren<CheckboxProps>
): React.FunctionComponentElement<React.PropsWithChildren<CheckboxProps>> => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.checked);
  };
  const key = "checkbox";
  return (
    <label className="switchSmall2 m5">
      <input type="checkbox" checked={props.checked} onChange={onChange} />
      <small></small>
    </label>
  );
};
