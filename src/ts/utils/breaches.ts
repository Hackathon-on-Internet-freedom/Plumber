import { DataBreach } from "../types";

export const getBreach = async (breaches: DataBreach[]) => {
  const currentDomain = await getSiteUrl();
  return breaches.filter((breach) => breach.Domain === currentDomain);
};

export const getSiteUrl = () =>
  new Promise<string>((res) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      const { url } = tabs[0];
      if (url) {
        const parsed = url && new URL(url);
        const currentDomain =
          parsed && parsed.hostname.match(/(www.)?(.+)/)?.[2];
        res(currentDomain);
      }
    });
  });
