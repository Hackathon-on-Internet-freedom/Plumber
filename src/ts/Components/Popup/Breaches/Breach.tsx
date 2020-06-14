import React, { useContext } from "react";
import { DataBreach } from "../../../types";
import { cn } from "@bem-react/classname";
import { PopupDataContext } from "../data/context";
const cN = cn("breach");
import "./breaches.scss";
import { BreachRow } from "./BreachRow";
import { useMsg } from "../../../utils/hooks/msg";

export interface BreachProps {
  emailExposed: boolean | null;
  domain: string;
  isRoot?: boolean;
  showHidden?: boolean;
}

export const Breach: React.FC<BreachProps> = props => {
  const msg = useMsg();
  const data = useContext(PopupDataContext);
  const domain = props.isRoot ? data.domain : props.domain;
  console.log("domain", domain, props.domain, data.domain);
  const breaches = data.breaches.filter(breach => breach.Domain === domain);
  const filteredBreaches = breaches.filter(
    breach => props.showHidden || !data.hiddenBreaches.includes(breach.Name)
  );

  const hideFactory = (name: string) => () => {
    data.hiddenBreaches = [...new Set([...data.hiddenBreaches, name])];
  };
  if (!props.isRoot && !filteredBreaches.length) {
    return null;
  }
  return (
    <div className={cN("wrapper")}>
      <div className={cN("domain")}>
        {domain || msg("breachesDifferentDomains")}
      </div>
      {breaches.length === 0 && (
        <div className={cN("status")}>{msg("breachesUnknown")}</div>
      )}
      {breaches.length > 0 && filteredBreaches.length === 0 && (
        <div className={cN("status")}>{msg("breachesHidden")}</div>
      )}
      {filteredBreaches.map(breach => (
        <BreachRow
          key={breach.Name}
          breach={breach}
          hide={hideFactory(breach.Name)}
          showHidden={props.showHidden}
        />
      ))}
    </div>
  );
};
