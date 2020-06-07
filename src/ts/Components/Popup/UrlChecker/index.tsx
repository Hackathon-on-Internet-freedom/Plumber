import React, { useState, useEffect } from "react";
import { DataBreach } from "../../../types";
import { cn } from "@bem-react/classname";
import { getBreach } from "../../../utils/breaches";
const cN = cn("breach-report");
import "./report.scss";
export const UrlChecker: React.FC<{ breaches: DataBreach[] }> = (props) => {
  const [breaches, setBreaches] = useState<DataBreach[]>([]);

  const loadBreaches = async () => {
    const b = await getBreach(props.breaches);
    if (b) {
      setBreaches(b);
    }
  };
  useEffect(() => {
    loadBreaches();
  }, [props.breaches]);
  const msg = chrome.i18n.getMessage;
  const leakedFields = [
    ...new Set(breaches.map((breach) => breach.DataClasses).flat()),
  ];
  const date = new Date(
    breaches
      .map((breach) => breach.ModifiedDate)
      .sort()
      .slice(-1)[0]
  );

  console.log(breaches);
  return (
    <div className={cN("wrapper")}>
      {breaches.length && (
        <>
          <div className={cN("title")}>
            {msg("breachTitle", [breaches[0].Domain, breaches.length])}
          </div>
          <div className={cN("date")}>
            {msg("breachLastDate")}
            {date.toDateString()}
          </div>
          <ul className={cN("list")}>
            {leakedFields.map((field) => (
              <li className={cN("row")}>{field}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
