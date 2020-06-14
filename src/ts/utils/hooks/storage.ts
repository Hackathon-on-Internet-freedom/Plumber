export const useChromeStorage = <T>(params: {
  key: string | [string];
  useSync?: boolean;
}) => {
  if (!chrome) {
    return;
  }
  const storage = params.useSync ? chrome.storage.sync : chrome.storage.local;

  const get = (callback: (data: T) => void) =>
    storage.get(params.key, (data: any) => {
      if (data) {
        callback(data);
      } else {
        throw "data not found";
      }
    });

  const set = (data: T) => storage.set(data);
  return [get, set] as [(cb: (data: T) => void) => void, (data: T) => void];
};
