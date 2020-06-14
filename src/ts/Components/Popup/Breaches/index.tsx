import React, { useState, useContext } from "react";
import { DataBreach } from "../../../types";
import { Breach } from "./Breach";
import { PopupState } from "../data/data";
import { GenericPage } from "../GenericPage";
import { PopupDataContext } from "../data/context";

export const BreachScreen: React.FC = props => {
  const data = useContext(PopupDataContext);
  const emailBreaches = data.breaches.filter(breach =>
    data.emailBreaches.includes(breach.Name)
  );
  const domains = [...new Set(emailBreaches.map(b => b.Domain))];
  return (
    <GenericPage back={() => (data.window = "main")}>
      <div className="breach-page">
        {domains.map(domain => (
          <Breach domain={domain} emailExposed={true} showHidden={true} />
        ))}
      </div>
    </GenericPage>
  );
};
