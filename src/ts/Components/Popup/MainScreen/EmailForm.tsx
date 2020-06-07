import React, { useContext, useState, useEffect } from "react";
import { PopupDataContext } from "../data/context";
import { cn } from "@bem-react/classname";
const cN = cn("email-form");

const msg = chrome.i18n.getMessage;
export const EmailForm: React.FC = () => {
  const data = useContext(PopupDataContext);
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (data.email) {
      setEmail("");
    }
  }, [data.email]);
  return (
    <div>
      <div>{msg("emailFormHasEmailBreached")}</div>
    </div>
  );
};
