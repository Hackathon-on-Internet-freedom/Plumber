import { PopupState, PopupData } from "./data";

const removeEmail = (stateObj: PopupData) => () => {
  stateObj.email = "";
  stateObj.emailBreaches = [];
  stateObj.hiddenBreaches = [];
  if (chrome.storage) {
    chrome.storage.local.set({ email: "", hiddenBreaches: [] });
  }
};

export const popupActions = { removeEmail };
