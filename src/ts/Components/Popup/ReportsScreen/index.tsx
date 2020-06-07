import React, { useContext } from "react";
import { PopupState } from "../data/data";
import { GenericPage } from "../GenericPage";
import { PopupDataContext } from "../data/context";

export const ReportsScreen: React.FC = () => {
  const data = useContext(PopupDataContext);
  return <GenericPage back={() => (data.window = "main")}>reports</GenericPage>;
};
