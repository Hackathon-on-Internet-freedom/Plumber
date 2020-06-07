import React from "react";
import { cn } from "@bem-react/classname";
import { useState, useEffect } from "react";
const cN = cn("generic-page");
import Arrow from "../../../img/left.svg";
export const GenericPage: React.FC<{ back: () => void }> = (props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  const back = () => {
    setShow(false);
    setTimeout(() => props.back(), 100);
  };

  return (
    <div className={cN("wrapper", { show })}>
      <div className={cN("button-container")}>
        <button onClick={back}>
          <Arrow /> {chrome.i18n.getMessage("goBackButton")}
        </button>
      </div>
      <div className={cN("content")}>{props.children}</div>
    </div>
  );
};
