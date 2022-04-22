// import Prism from "prismjs"
// import "prismjs/components/prism-markup"
// import "prismjs/components/prism-pug"
// import "prismjs/components/prism-css"

// import "prismjs/themes/prism-okaidia.css"
import hljs from "highlight.js"
// import pug from "highlight.js/lib/languages/pug"
// import "highlight.js"
hljs.highlightAll()
import icons from "../icons/icons"
import Swup from "swup"

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
  load() {
    console.log("load")
  },
  resized() {
    console.log("resized")
  },

  init: function () {
    app.iconSpriteFn()
    app.load()
  },
}

function docReadied(fn) {
  window.addEventListener("DOMContentLoaded", fn)
}
function docResized(fn) {
  window.addEventListener("resize", fn)
}
docReadied(() => {
  const swup = new Swup({
    cache: true,
  })
  swup.on("contentReplaced", function () {
    swup.options.containers.forEach(() => {
      app.iconSpriteFn()
    })
  })
  app.init()
})

docResized(() => {
  app.resized()
})

export default { docResized, docReadied }
