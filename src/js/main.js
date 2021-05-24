import Swup from "swup";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

var app = {
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
  const swup = new Swup();
  swup.on("contentReplaced", function () {
    swup.options.containers.forEach((selector) => {
      app.init();
    });
  });
  app.init();
});

docResized(() => {
  app.resized();
});

export default { docResized, docReadied };
