import React, { useContext } from "react";
import { DataBreach } from "../../../types";
import { cn } from "@bem-react/classname";
import { PopupDataContext } from "../data/context";
const cN = cn("breach");
import "./breaches.scss";
import { BreachRow } from "./BreachRow";

export interface BreachProps {
  emailExposed: boolean | null;
  domain: string;
}
const msg = chrome.i18n.getMessage;

export const Breach: React.FC<BreachProps> = (props) => {
  const data = useContext(PopupDataContext);
  const breaches = data.breaches.filter(
    (breach) => breach.Domain === props.domain
  );
  const filteredBreaches = breaches.filter(
    (breach) => !data.hiddenBreaches.includes(breach.Name)
  );

  const hideFactory = (name: string) => () => {
    data.hiddenBreaches = [...new Set([...data.hiddenBreaches, name])];
  };
  return (
    <div className={cN("wrapper")}>
      <div className={cN("domain")}>{props.domain}</div>
      {breaches.length === 0 && (
        <div className={cN("status")}>{msg("breachesUnknown")}</div>
      )}
      {breaches.length > 0 && filteredBreaches.length === 0 && (
        <div className={cN("status")}>{msg("breachesHidden")}</div>
      )}
      {filteredBreaches.map((breach) => (
        <BreachRow
          key={breach.Name}
          breach={breach}
          hide={hideFactory(breach.Name)}
        />
      ))}
    </div>
  );
};
