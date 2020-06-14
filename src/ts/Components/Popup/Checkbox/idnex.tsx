import * as React from "react";
import "./checkbox.scss";

interface CheckboxProps {
  onChange: (newValue: boolean) => void;
  text?: string;
  checked: boolean;
}

import { cn } from "@bem-react/classname";
export const Checkbox = (
  props: React.PropsWithChildren<CheckboxProps>
): React.FunctionComponentElement<React.PropsWithChildren<CheckboxProps>> => {
  const checkbox = cn("checkbox");
  const onChange = (e: any) => {
    props.onChange(e.target.checked);
  };
  const key = Math.random()
    .toString(32)
    .slice(3, 7);
  return (
    <div className={checkbox("wrapper")}>
      <input
        id={key}
        type="checkbox"
        checked={props.checked}
        onChange={onChange}
        className={checkbox()}
      />
      <label htmlFor={key} className={checkbox("label")}>
        <span>{props.text || props.children || ""}</span>
      </label>
    </div>
  );
};
