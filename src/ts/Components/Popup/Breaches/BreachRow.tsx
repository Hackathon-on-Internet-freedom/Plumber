import React, { useState } from "react";
import { DataBreach } from "../../../types";

import { cn } from "@bem-react/classname";
import { getBreach } from "../../../utils/breaches";
import hider from "../../../../img/hider.png";

const cN = cn("breach-row");

export interface BreachRowProps {
  breach: DataBreach;
  hide: () => void;
}
const msg = chrome.i18n.getMessage;

// retired
// fabricated
// spamlist
// verified
// unverified - показываем если все False

const getStatus = (breach: DataBreach) => {
  if (breach.IsRetired) {
    return ["retired", "grey"];
  }
  if (breach.IsFabricated) {
    return ["fabricated", "yellow"];
  }
  if (breach.IsSpamList) {
    return ["spamlist", "yellow"];
  }
  if (breach.IsVerified) {
    return ["verified", "red"];
  }
  return ["unverified", "grey"];
};
export const BreachRow: React.FC<BreachRowProps> = (props) => {
  const [status, color] = getStatus(props.breach);
  return (
    <div className={cN("wrapper")}>
      <div className={cN("breached")}>
        {msg("breachRowBreached")}{" "}
        {new Date(props.breach.ModifiedDate).toLocaleDateString()}
      </div>
      <div className={cN("status", { color })}>
        {msg(`breachStatus${status}`)}
      </div>
      <WhatExposed breach={props.breach} />
      <img src={hider} onClick={props.hide} />
    </div>
  );
};

const WhatExposed: React.FC<{ breach: DataBreach }> = (props) => {
  const [show, setShow] = useState(false);
  return (
    <div
      onClick={() => setShow(!show)}
      className={cN("exposed-wrapper", { show })}
    >
      <div className={cN("exposed-title")}> {msg("breachRowExposed")}</div>
      {props.breach.DataClasses.map((dc) => (
        <div key={dc} className={cN("exposed-data-class")}>
          {" "}
          {dc}{" "}
        </div>
      ))}
    </div>
  );
};
