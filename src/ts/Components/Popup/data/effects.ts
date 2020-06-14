import { PopupData, PopupActions, PopupState } from "./data";
import { useEffect } from "react";
import { getSiteUrl } from "../../../utils/breaches";
import { getDomainReports, getBreachesByEmail } from "../../../utils/api";
import { stateToObject } from "../../../utils/dataUrilts";

export const usePopupEffects = (stateObj: PopupState) => {
  useEffect(() => {
    console.log("here", stateObj.domain);
    if (stateObj.domain) {
      getDomainReports(stateObj.domain).then(res => {
        console.log("res", res);
        stateObj.reports = res;
      });
    }
  }, [stateObj.domain]);

  useEffect(() => {
    getSiteUrl().then(domain => (stateObj.domain = domain));
    const retrivingItems = ["breaches", "hiddenBreaches", "email"] as const;
    if (!chrome.storage) {
      return;
    }
    chrome.storage.local.get(retrivingItems, items => {
      retrivingItems.forEach(element => {
        if (element in items) {
          stateObj[element] = items[element];
        }
      });
    });
  }, []);

  useEffect(() => {
    if (!stateObj.saveEmail) {
      return;
    }
    if (!chrome.storage) {
      return;
    }
    chrome.storage.local.set({ hiddenBreaches: stateObj.hiddenBreaches });
  }, [stateObj.hiddenBreaches]);

  useEffect(() => {
    if (stateObj.saveEmail && chrome.storage) {
      chrome.storage.local.set({ email: stateObj.email });
    }
    if (stateObj.email) {
      getBreachesByEmail(stateObj.email).then(
        breaches => (stateObj.emailBreaches = breaches.map(({ Name }) => Name))
      );
    }
  }, [stateObj.email]);
};
