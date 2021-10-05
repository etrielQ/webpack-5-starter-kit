import icons from "../icons/icons";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { loadAnimation } from "lottie-web";
import { defineLordIconElement } from "lord-icon-element";
defineLordIconElement(loadAnimation);

var app = {
  iconSpriteFn() {
    icons.forEach(iconSpriteFn);
    function iconSpriteFn(item, index) {
      const iconSprite = document.querySelector("#iconSprite");
      if (iconSprite) {
        iconSprite.innerHTML +=
          "<div class='icon-sprite__item'>" +
          "<span class='icon-sprite__number'>" +
          (index + 1) +
          "</span>" +
          "<div class='icon-sprite__preview'>" +
          item.iconSvg +
          "</div>" +
          "<div class='icon-sprite__name'>" +
          item.iconId +
          "</div>" +
          "</div>";
      }

      const icon = document.querySelectorAll(".icon");
      if (icon) {
        Array.prototype.forEach.call(icon, (el) => {
          let dataIconId = el.getAttribute("data-icon-id");
          if (dataIconId == item.iconId) {
            el.innerHTML = item.iconSvg;
          }
        });
      }
    }
  },
  load() {
    console.log("load");
  },
  resized() {
    console.log("resized");
  },

  swiperTest() {
    const swiper = new Swiper(".swiper-container", {
      loop: true,
    });
  },

  init: function () {
    app.iconSpriteFn();
    app.load();
    app.swiperTest();
  },
};

function docReadied(fn) {
  window.addEventListener("DOMContentLoaded", fn);
}
function docResized(fn) {
  window.addEventListener("resize", fn);
}
docReadied(() => {
  app.init();
});

docResized(() => {
  app.resized();
});

export default { docResized, docReadied };
