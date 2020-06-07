import { createContext } from "react";
import { PopupState, usePopupData } from "./data";

export const PopupDataContext = createContext<PopupState>({} as PopupState);
