const messages = require("../../../_locales/en/messages.json");

export const useMsg = () => {
  if (chrome.i18n) {
    return chrome.i18n.getMessage;
  }
  return (msg: string, ...args: any) => {
    return messages[msg]?.message || "";
  };
};
