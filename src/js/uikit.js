import icons from "../icons/icons"
import Prism from "prismjs"
import "prismjs/plugins/toolbar/prism-toolbar.js"
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-pug"
import "prismjs/components/prism-css"
import "prismjs/themes/prism-tomorrow.min.css"
import SmoothScroll from "smooth-scroll"
import Gumshoe from "gumshoejs"

export default function uikit() {
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
        "<span class='icon icon-font'>" +
        item.iconSvg +
        "</span>" +
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

  const uiContent = document.querySelectorAll(".js-uikit-content .uikit__item")
  const uiSide = document.querySelector(".js-uikit-side")
  uiContent.forEach((uiContent, i) => {
    let uiContentName = uiContent.getAttribute("id")
    const uiLinkItem = document.createElement("li")
    const uiLinkItemA = document.createElement("a")
    uiLinkItemA.setAttribute("href", `#${uiContentName}`)
    uiLinkItem.classList.add("uikit__side-item")
    uiLinkItem.appendChild(uiLinkItemA)
    uiLinkItemA.innerHTML = uiContentName.replace(/-/g, " ")

    let uiContentParent = uiContent.getAttribute("data-ui-parent")

    uiSide.querySelectorAll(".uikit__side-field").forEach((element) => {
      var title = element.querySelector(".uikit__side-title")
      if (title.innerHTML === uiContentParent) {
        element.querySelector(".uikit__side-list").appendChild(uiLinkItem)
      }
    })
  })

  var scroll = new SmoothScroll('.js-uikit-scroll a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
    offset: 150,
    updateURL: false,
  })
  if (document.querySelector(".js-uikit-scroll")) {
    var spy = new Gumshoe(".js-uikit-scroll a", {
      offset: 150,
    })
    document.addEventListener(
      "gumshoeActivate",
      function (event) {
        var linkText = event.detail.link.innerHTML
        var linkUrl = event.detail.link.getAttribute("href")
        document.querySelector(".js-scroll-text").innerHTML = linkText
        // window.location.hash = linkUrl
      },
      false
    )
  }

  const uikitSearch = document.querySelector(".js-uikit-search")

  if (uikitSearch) {
    document.onkeydown = function (evt) {
      evt = evt || window.event
      var isEscape = false
      if ("key" in evt) {
        isEscape = evt.key === "Enter"
      } else {
        isEscape = evt.keyCode === 13
      }
      if (isEscape) {
        uikitSearch.focus()
      }
    }

    uikitSearch.addEventListener("keyup", (event) => {
      var uikitSearch, filter, ul, li, a, i, txtValue
      filter = event.target.value.toUpperCase()
      // ul = document.getElementById("myUL")
      li = document.querySelectorAll(".uikit__side-item")
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]
        txtValue = a.textContent || a.innerText
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = ""
        } else {
          li[i].style.display = "none"
        }
      }
    })
  }
}
