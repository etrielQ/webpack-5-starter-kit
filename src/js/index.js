import css from "../scss/style.scss"
import $ from "jquery"
import * as main from "./main"

function docReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1)
  } else {
    document.addEventListener("DOMContentLoaded", fn)
  }
}
docReady(() => {
  main
})
