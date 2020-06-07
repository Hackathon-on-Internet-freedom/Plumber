import "../img/icon-128.png";
import "../img/icon-34.png";
import { DataBreach } from "./types";
import { getBreach } from "./utils/breaches";

let breaches: DataBreach[] = [];
chrome.storage.local.get("breaches", (data) => {
  console.log("breaches!@#$", data.breaches);
  breaches = data.breaches;
});

chrome.storage.onChanged.addListener((changes) => {
  if ("breaches" in changes) {
    breaches = changes.breaches.newValue;
  }
});

const checkIcon = () => {
  chrome.tabs.query({ active: true }, async (tabs) => {
    const breach = await getBreach(breaches);
    console.log("stored", breaches);
  });
};

chrome.tabs.onActivated.addListener((activateEvent) => {
  chrome.tabs.onUpdated.addListener((e) => {
    checkIcon();
  });
});

const loadBreaches = () => {
  fetch("https://haveibeenpwned.com/api/v3/breaches")
    .then((res) => res.json())
    .then((allBreaches) => {
      chrome.storage.local.set({ breaches: allBreaches });
    });
};

chrome.runtime.onInstalled.addListener(function (a) {
  chrome.alarms.create("breachCheck", {
    when: Date.now(),
    periodInMinutes: 60 * 12,
  });
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "breachCheck") {
      loadBreaches();
    }
  });
});
