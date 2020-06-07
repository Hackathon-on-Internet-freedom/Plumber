import React, { useContext } from "react";
import { PopupState } from "../data/data";
import { PopupDataContext } from "../data/context";
import { ReportBlock } from "./ReportBlock";
import "./mainscreen.scss";

import { cn } from "@bem-react/classname";
import { Breach } from "../Breaches/Breach";
import { EmailForm } from "./EmailForm";
const cN = cn("main-screen");
export const MainScreen: React.FC = () => {
  const data = useContext(PopupDataContext);
  return (
    <div className={cN("wrapper")}>
      <div className={cN("block")}>
        <ReportBlock />
        <Breach domain={data.domain} emailExposed={false} />
      </div>

      <div className={cN("block")}>
        <EmailForm />
      </div>
    </div>
  );
};
