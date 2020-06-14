import React, { useContext, useState } from "react";
import { PopupState } from "../data/data";
import { GenericPage } from "../GenericPage";
import { PopupDataContext } from "../data/context";
import plumber from "../../../../img/plumber.png";
import { cn } from "@bem-react/classname";
import { useMsg } from "../../../utils/hooks/msg";
import "./report-form.scss";
import { postDomainReport } from "../../../utils/api";

export const ReportsScreen: React.FC = () => {
  const cN = cn("report-form");
  const data = useContext(PopupDataContext);
  const [report, setReport] = useState("");
  const genericMsg = useMsg();
  const level = data.reportLevel;
  const submit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (level) {
      const res = await postDomainReport({
        domain: data.domain,
        level,
        description: report
      }).then(res => res.text());
      if (res === "ok") {
        data.reportLevel = "";
        data.window = "main";
      }
    }
  };
  const msg = (block: string) => genericMsg(`reportForm${block}I${level}`);
  return (
    <GenericPage back={() => (data.window = "main")}>
      <div className={cN("wrapper")}>
        <img src={plumber} alt="" className={cN("image")} />
        <div className={cN("title")}>{msg("Title")}</div>
        <form onSubmit={submit}>
          <textarea
            value={report}
            onChange={e => setReport(e.target.value)}
            className={cN("input")}
            placeholder={msg("Placeholder")}
          />
          <button className={cN("submit")}>{msg("Submit")}</button>
        </form>
      </div>
    </GenericPage>
  );
};
