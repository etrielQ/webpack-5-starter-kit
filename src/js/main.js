import uikit from "./uikit.js"
import Swup from "swup"

uikit()

var app = {
  iconSpriteFn() {},
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
