import "../css/popup.scss";
import { Popup } from "./Components/Popup";
import React from "react";
import { render } from "react-dom";
import { hot } from "react-hot-loader/root";

const App = hot(Popup);

render(<App />, window.document.getElementById("app-container"));
