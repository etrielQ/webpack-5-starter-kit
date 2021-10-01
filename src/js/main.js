import css from "../scss/style.scss";
// const $ = require("jquery"); // if we need
import apiPage from "./api";
import * as main from "./page";

function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}
docReady(() => {
  main;
  new apiPage();
});
