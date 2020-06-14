import React from "react";

import { cn } from "@bem-react/classname";

import { BreachScreen } from "./Breaches";
import { usePopupData, PopupData } from "./data/data";
import { MainScreen } from "./MainScreen";
import { ReportsScreen } from "./ReportsScreen";
import { PopupDataContext } from "./data/context";
const cN = cn("popup");

const router: {
  [key in PopupData["window"]]: React.FC;
} = {
  main: MainScreen,
  reports: ReportsScreen,
  breaches: BreachScreen,
};

export const Popup: React.FC = () => {
  const data = usePopupData();

  return (
    <div className={cN("wrapper")}>
      <PopupDataContext.Provider value={data}>
        <MainScreen />
        {data.window !== "main" && React.createElement(router[data.window])}
      </PopupDataContext.Provider>
    </div>
  );
};
