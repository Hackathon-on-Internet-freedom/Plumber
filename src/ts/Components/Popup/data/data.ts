import { DomainReport, DataBreach } from "../../../types";
import { useState } from "react";
import { stateToObject, bindMethods } from "../../../utils/dataUrilts";
import { popupActions } from "./actions";
import { usePopupEffects } from "./effects";

export interface PopupData {
  domain: string;
  reports: DomainReport[];
  window: "main" | "reports" | "breaches";
  breaches: DataBreach[];
  hiddenBreaches: string[];
  email: string;
  saveEmail: boolean;
  emailBreaches: string[];
  reportLevel: ReportLevel | "";
}
export type ReportLevel = "warning" | "danger" | "ok" | "owner" | "initial";
export interface PopupActions {
  removeEmail: () => void;
}

export type PopupState = PopupData & PopupActions;
export const usePopupData = (): PopupState => {
  const reportLevel = useState<PopupData["reportLevel"]>("warning");
  const domain = useState<PopupData["domain"]>("");
  const reports = useState<PopupData["reports"]>([]);
  const window = useState<PopupData["window"]>("reports");
  const breaches = useState<PopupData["breaches"]>([]);
  const hiddenBreaches = useState<PopupData["hiddenBreaches"]>([]);
  const email = useState<PopupData["email"]>("");
  const saveEmail = useState<PopupData["saveEmail"]>(true);
  const emailBreaches = useState<PopupData["emailBreaches"]>([]);

  const stateObj = stateToObject<PopupData>({
    reportLevel,
    reports,
    domain,
    window,
    breaches,
    hiddenBreaches,
    email,
    saveEmail,
    emailBreaches
  });

  const objectWithMethods = bindMethods<PopupData, PopupActions>(
    stateObj,
    popupActions
  );

  usePopupEffects(objectWithMethods);
  return objectWithMethods;
};
