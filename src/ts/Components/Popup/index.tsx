import React, { useState, useEffect } from "react";
import icon from "../../img/icon-128.png";

import { cn } from "@bem-react/classname";
import { DataBreach } from "../../types";
import { getBreachesByEmail, getDomainReports } from "../../utils/api";
import { useChromeStorage } from "../../utils/hooks/storage";
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
  const msg = chrome.i18n.getMessage;
  const [showBreaches, setShowBreaches] = useState(false);
  const [getSyncEmail, setSyncEmail] = useChromeStorage<{ email: string }>({
    key: "email",
    useSync: true,
  });
  useEffect(() => {
    getSyncEmail((res) => setEmail(res.email));
    getStorageBreaches((res) => setBreaches(res.breaches));
  }, []);

  const [getStorageBreaches, setStorageBreaches] = useChromeStorage<{
    breaches: DataBreach[];
  }>({ key: "breaches" });

  const [email, setEmail] = useState("");
  const [saveEmail, setSaveEmail] = useState(true);

  const [breaches, setBreaches] = useState<DataBreach[]>([]);

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
