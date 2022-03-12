import icons from "../icons/icons"
// import Swup from "swup";
import Swiper from "swiper"
import "swiper/swiper-bundle.css"
import babelUikit from "babel-uikit/index"
import "babel-uikit/_style.scss"

var app = {
  iconSpriteFn() {
    icons.forEach(iconSpriteFn)
    function iconSpriteFn(item, index) {
      const iconSprite = document.querySelector("#iconSprite")
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
          "</div>"
      }

      const icon = document.querySelectorAll(".icon")
      if (icon) {
        Array.prototype.forEach.call(icon, (el) => {
          let dataIconId = el.getAttribute("data-icon-id")
          if (dataIconId == item.iconId) {
            el.innerHTML = item.iconSvg
          }
        })
      }
    }
  },
  inputFn() {
    const inputItem = document.querySelectorAll(
      ".input-item input, .input-item textarea"
    )
    inputItem.forEach((e) => {
      e.addEventListener("focusin", () => {
        e.parentNode.classList.add("input-item--focused")
      })
      e.addEventListener("focusout", () => {
        if (e.value == "") {
          e.parentNode.classList.remove("input-item--focused")
        } else {
          e.parentNode.classList.add("input-item--focused")
        }
      })
    })
  },

  load() {
    console.log("load")
  },
  resized() {
    console.log("resized")
  },

  swiperTest() {
    const swiper = new Swiper(".swiper-container", {
      loop: true,
    })
  },

  init: function () {
    app.iconSpriteFn()
    app.load()
    app.swiperTest()
    app.inputFn()
  },
}

function docReadied(fn) {
  window.addEventListener("DOMContentLoaded", fn)
}
function docResized(fn) {
  window.addEventListener("resize", fn)
}
docReadied(() => {
  // const swup = new Swup({
  //   cache: true,
  // });
  // swup.on("contentReplaced", function () {
  //   swup.options.containers.forEach(() => {
  //     app.iconSpriteFn();
  //     app.swiperTest();
  //   });
  // });
  app.init()
})

docResized(() => {
  app.resized()
})

export default { docResized, docReadied }
