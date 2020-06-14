import React, { useContext, useState } from "react";
import { PopupDataContext } from "../data/context";
import plumber from "../../../../img/plumber.png";

import { cn } from "@bem-react/classname";
import { useMsg } from "../../../utils/hooks/msg";
import { ReportLevel } from "../data/data";
const cN = cn("report-block");
export const ReportBlock: React.FC = () => {
  const data = useContext(PopupDataContext);
  const msg = useMsg();
  const openReportsFactory = (level: ReportLevel) => () => {
    data.window = "reports";
    data.reportLevel = level;
  };
  return (
    <div className={cN("wrapper")}>
      {!data.reports.length ? (
        <button
          onClick={openReportsFactory("initial")}
          className={cN("suspicious")}
        >
          <img src={plumber} /> {msg("reportsBlockSuspicious")}
        </button>
      ) : (
        <>
          <div className={cN("danger-wrapper")}>
            <div className={cN("advice")}>{msg("reportsBlockAdvice")}</div>
            <button
              className={cN("report-row", { type: "warning" })}
              onClick={openReportsFactory("warning")}
            >
              <span className={cN("exclamation")}>!</span>
              <span className={cN("report-description")}>
                {msg("reportsBlockWarningText")}
              </span>
              <span className={cN("row-button", { type: "warning" })}>
                {msg("reportsBlockReportButtonText")}
              </span>
            </button>
            <button
              className={cN("report-row", { type: "danger" })}
              onClick={openReportsFactory("danger")}
            >
              <span className={cN("exclamation")}>!</span>
              <span className={cN("report-description")}>
                {msg("reportsBlockReportText")}
              </span>
              <span className={cN("row-button", { type: "danger" })}>
                {msg("reportsBlockReportButtonText")}
              </span>
            </button>
          </div>
          <div
            onClick={openReportsFactory("owner")}
            className={cN("site-owner")}
          >
            {msg("reportBlockOwnerForm")}
          </div>
        </>
      )}
    </div>
  );
};
