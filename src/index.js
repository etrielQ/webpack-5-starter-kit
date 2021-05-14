import css from "./css/style.scss";
const $ = require("jquery");
import icons from "./icons/icons";

$(function () {
  console.log("loaded");
});

icons.forEach(iconSpriteFn);

function iconSpriteFn(item) {
  var elements = document.querySelectorAll(".icon");
  Array.prototype.forEach.call(elements, function (el) {
    var dataIconId = el.getAttribute("data-icon-id");
    if (dataIconId == item.iconId) {
      el.innerHTML = item.iconSvg;
    }
  });
}
