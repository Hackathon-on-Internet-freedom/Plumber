import React from "react";
import { cn } from "@bem-react/classname";
import { useState, useEffect } from "react";
const cN = cn("generic-page");
import Arrow from "../../../img/left.svg";
import { useMsg } from "../../utils/hooks/msg";
export const GenericPage: React.FC<{ back: () => void }> = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  const back = () => {
    setShow(false);
    setTimeout(() => props.back(), 100);
  };

  const msg = useMsg();
  return (
    <div className={cN("wrapper", { show })}>
      <div className={cN("button-container")}>
        <button onClick={back}>
          <Arrow /> {msg("goBackButton")}
        </button>
      </div>
      <div className={cN("content")}>{props.children}</div>
    </div>
  );
};
