import React, { useContext } from "react";
import { PopupDataContext } from "../data/context";
import plumber from "../../../../img/plumber.png";

import { cn } from "@bem-react/classname";
const cN = cn("report-block");
export const ReportBlock: React.FC = () => {
  const data = useContext(PopupDataContext);
  const msg = chrome.i18n.getMessage;
  const openReports = () => {
    data.window = "reports";
  };
  return (
    <div className={cN("wrapper")}>
      <button onClick={openReports} className={cN("suspicious")}>
        <img src={plumber} /> {msg("reportsBlockSuspicious")}
      </button>
      <div className={cN("suspicious-count")}>
        <button onClick={openReports} className={cN("plus-one")}>
          +1
        </button>
        <span>
          {data.reports.length} {msg("reportsBlockSuspiciousCount")}
        </span>
      </div>

      <div className={cN("advice")}>{msg("reportsBlockAdvice")}</div>
    </div>
  );
};
