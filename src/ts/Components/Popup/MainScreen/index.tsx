import React, { useContext } from "react";
import { PopupState } from "../data/data";
import { PopupDataContext } from "../data/context";
import { ReportBlock } from "./ReportBlock";
import "./style/mainscreen.scss";

import { cn } from "@bem-react/classname";
import { Breach } from "../Breaches/Breach";
import { EmailForm } from "./EmailForm";
const cN = cn("main-screen");
export const MainScreen: React.FC = () => {
  return (
    <div className={cN("wrapper")}>
      <ReportBlock />

      <div className={cN("block")}>
        <Breach domain={""} emailExposed={false} isRoot={true} />
      </div>
      <div className={cN("block")}>
        <EmailForm />
      </div>
    </div>
  );
};
