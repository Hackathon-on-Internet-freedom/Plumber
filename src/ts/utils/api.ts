import { DataBreach, DomainReport } from "../types";
import { ReportLevel } from "../Components/Popup/data/data";

const baseUrl = "https://plumber.com.de/api";
const get = <T>(url: string) =>
  fetch(`${baseUrl}/${url}`).then(res => res.json()) as Promise<T>;

export const post = <T, R = {}>(url: string, params: R) =>
  fetch(`${baseUrl}/${url}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(params)
  }).then(res => res.json()) as Promise<T>;

export const getBreachesByEmail = (email: string) =>
  get<Array<{ Name: string }>>(`email/${email}`);

export const getDomainReports = (domain: string) =>
  get<DomainReport[]>(`report/${domain}`);

export const postDomainReport = (data: {
  domain: string;
  description: string;
  level: ReportLevel;
}) =>
  fetch(`${baseUrl}/report`, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });
