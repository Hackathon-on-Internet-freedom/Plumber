import { DataBreach, DomainReport } from "../types";

const baseUrl = "https://u4835.dark.elastictech.org/api";
const get = <T>(url: string) =>
  fetch(`${baseUrl}/${url}`).then((res) => res.json()) as Promise<T>;

export const post = <T, R extends {}>(url: string, params: R) =>
  fetch(`${baseUrl}/${url}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(params),
  }).then((res) => res.json()) as Promise<T>;

export const getBreachesByEmail = (email: string) =>
  get<Array<{ Name: string }>>(`email/${email}`);

export const getDomainReports = (domain: string) =>
  get<DomainReport[]>(`report/${domain}`);
