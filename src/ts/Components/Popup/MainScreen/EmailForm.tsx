import React, { useContext, useState, useEffect, useMemo } from "react";
import { PopupDataContext } from "../data/context";
import { cn } from "@bem-react/classname";
const cN = cn("email-form");
import "./style/email-form.scss";
import { Breach } from "../Breaches/Breach";
import { useMsg } from "../../../utils/hooks/msg";
import { Checkbox } from "../Checkbox/idnex";
import hider from "../../../../img/hider.png";
export const EmailForm: React.FC = () => {
  // const data = useContext(PopupDataContext);
  const msg = useMsg();
  const [email, setEmail] = useState("");
  const data = useContext(PopupDataContext);
  const [saveEmail, setSaveEmail] = useState(true);
  useEffect(() => {
    if (data.email) {
      setEmail(data.email);
    }
  }, [data.email]);
  const emailBreaches = useMemo(
    () =>
      data.breaches.filter(
        breach =>
          data.emailBreaches.includes(breach.Name) &&
          !data.hiddenBreaches.includes(breach.Name)
      ),
    [data.breaches, data.emailBreaches, data.hiddenBreaches]
  );

  const onEmailFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    data.email = email;
  };

  const headerType = (() => {
    if (!data.email) {
      return "blank";
    }
    if (!emailBreaches.length) {
      return "ok";
    }
    return "danger";
  })();
  console.log(data.breaches);
  const domains = [...new Set(emailBreaches.map(b => b.Domain))];
  return (
    <div className={cN("wrapper")}>
      <div className={cN("header-content", { type: headerType })}>
        {headerType === "blank" && msg("emailFormHasEmailBreached")}
        {headerType === "ok" && msg("emailFormNoNewBreaches")}
        {headerType === "danger" && (
          <>
            {msg("emailFormNewBreachesDetected")}
            <span className={cN("smile")}> :(</span>
          </>
        )}
      </div>
      {!data.email ? (
        <div>
          <form onSubmit={onEmailFormSubmit}>
            <div className={cN("email-row")}>
              <input
                type="email"
                className={cN("email-input")}
                placeholder="E-mail"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <button className={cN("show-breach-button")} type="submit">
                {msg("emailFormCheck")}
              </button>
            </div>
            <Checkbox
              checked={data.saveEmail}
              onChange={v => (data.saveEmail = v)}
              text={msg("emailFormRememberMe")}
            />
          </form>
        </div>
      ) : (
        <div className={cN("saved-email-row")}>
          <button
            className={cN("remove-email")}
            onClick={() => {
              data.removeEmail();
            }}
          >
            <img src={hider} />
          </button>
          <div className={cN("saved-email")}>{data.email}</div>
          <button
            onClick={() => (data.window = "breaches")}
            className={cN("show-breach-button")}
            type="submit"
          >
            {msg("emailFormShowBreaches")}
          </button>
        </div>
      )}
      <div className={cN("breaches")}>
        {domains.map(domain => (
          <Breach emailExposed={true} domain={domain} key={domain} />
        ))}
      </div>
    </div>
  );
};
