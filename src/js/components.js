import Accordion from "accordion-js"
import "accordion-js/dist/accordion.min.css"
import toastr from "toastr"
import "toastr/build/toastr.min.css"
import Swiper, { Navigation, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import tippy from "tippy.js"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale.css"
import { Fancybox } from "@fancyapps/ui"
import "@fancyapps/ui/dist/fancybox.css"

export default function components() {
  // filter tab component
  const filterTab = document.querySelectorAll(".filter-tab")
  filterTab.forEach((filterTabEl) => {
    const tabItem = filterTabEl.querySelectorAll(".tab-item")
    const tabContent = filterTabEl.querySelectorAll(".tab-content")
    const tabContentParent = filterTabEl.querySelector(".filter-tab-content")
    let filterTabAnimation = filterTabEl.getAttribute("data-filter-animation")
    filterTabEl.classList.add(`filter-tab--${filterTabAnimation}`)

    tabItem.forEach((tabItemEl) => {
      tabItemEl.addEventListener("click", () => {
        if (!tabItemEl.classList.contains("active")) {
          //tab item
          let tabItemDataFilter = tabItemEl.getAttribute("data-filter")
          let tabItemActive = filterTabEl.querySelectorAll(".tab-item.active")
          tabItemActive.forEach((tabItemActiveEl) => {
            tabItemActiveEl.classList.remove("active")
          })
          tabItemEl.classList.add("active")

          //tab content
          tabContent.forEach((tabContentEl) => {
            tabContentEl.classList.add("filtering")
            setTimeout(() => {
              tabContentEl.classList.remove("filtering")
              tabContentEl.classList.add("filtered")
            }, 250)
          })
          tabContentParent
            .querySelectorAll(`.${tabItemDataFilter}`)
            .forEach((tabItemDataFilterEl) => {
              setTimeout(() => {
                tabItemDataFilterEl.classList.remove("filtered")
              }, 250)
            })
        }
      })
    })
  })

  // accordion component
  $("body").on("click", ".js-accordion-trigger", function () {
    $(this).toggleClass("active")
    const accordionGroup = $(this).closest(".accordion-wrapper")
    const item = $(this).closest(".accordion-item")
    let multipleShow = false

    if (accordionGroup.data("multiple-show") == true) {
      multipleShow = true
    } else {
      $(".js-accordion-trigger").not(this).removeClass("active")
    }
    let content = item.find(".accordion-calc")
    let contentHeight = content.outerHeight(true)
    console.log(contentHeight)
    if (item.hasClass("active") && !$(this).hasClass("force-open")) {
      item.find(".accordion-content").css("height", 0 + "px")
      item.removeClass("active")
    } else {
      if (!multipleShow) {
        accordionGroup.children(".accordion-item").removeClass("active")
        accordionGroup
          .children(".accordion-item")
          .find(".accordion-content")
          .css("height", 0 + "px")
      }
      item.addClass("active")
      item.find(".accordion-content").css("height", contentHeight)
    }
  })

  $(".accordion-item.opened .js-accordion-trigger").trigger("click")

  // alert toastr component
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "4000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  }

  function alertToastr(type, message) {
    toastr[type](message)
  }
  window.alertToastr = alertToastr

  // swiper test
  const swiper = new Swiper(".swiper", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    modules: [Navigation, Pagination],

    pagination: {
      el: ".swiper-pagination",
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  // tippy js
  tippy("[data-tippy-content]", {
    animation: "scale",
  })

  //fancybox
  Fancybox.bind("[data-fancybox]", {
    infinite: false,
    Escape: "close",
    Delete: "close",
    Backspace: "close",
    PageUp: "next",
    PageDown: "prev",
    ArrowUp: "next",
    ArrowDown: "prev",
    ArrowRight: "next",
    ArrowLeft: "prev",
  })

  //input
  const inputItem = document.querySelectorAll(
    ".input-item input, .input-item textarea"
  )
  inputItem.forEach((e) => {
    e.addEventListener("focusin", () => {
      e.parentNode.classList.add("input-item--focused")
    })
    e.addEventListener("focusout", () => {
      e.parentNode.classList.remove("input-item--focused")
      if (e.value === "") {
        e.parentNode.classList.remove("input-item--valued")
      } else {
        e.parentNode.classList.add("input-item--valued")
      }
    })
  })

  // file upload
  const fileInput = document.querySelectorAll(".js-file-upload")
  fileInput.forEach((fileInputEl) => {
    let fileSelect = fileInputEl.parentNode
    fileSelect.onclick = function () {
      fileInputEl.click()
    }

    fileInputEl.onchange = function () {
      let selectField = fileSelect.querySelector(".js-file-upload-field")
      for (let i = 0; i < fileInputEl.files.length; i++) {
        console.log(fileInputEl.files)
        const element = fileInputEl.files[i]
        if (fileInputEl.files.length > 0) {
          selectField.innerHTML += `<div class="input-item__file-item">
          <span>${element.name}</span>
          </div>`
        }
      }
    }
  })

  //dark mode
  let darkMode = localStorage.getItem("darkMode")
  const html = document.querySelector("html")
  const darkModeToggle = document.querySelector(".js-dark-mode")
  const enableDarkMode = () => {
    html.setAttribute("data-theme", "dark")
    localStorage.setItem("darkMode", "enabled")
    if (darkModeToggle) {
      if (darkModeToggle.tagName.toLowerCase() === "input") {
        darkModeToggle.setAttribute("checked", "checked")
      }
    }
  }
  const disableDarkMode = () => {
    html.setAttribute("data-theme", "default")
    localStorage.setItem("darkMode", null)
    if (darkModeToggle) {
      if (darkModeToggle.tagName.toLowerCase() === "input") {
        darkModeToggle.removeAttribute("checked")
      }
    }
  }

  if (darkMode === "enabled") {
    enableDarkMode()
  } else {
    disableDarkMode()
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      darkMode = localStorage.getItem("darkMode")

      if (darkMode !== "enabled") {
        enableDarkMode()
      } else {
        disableDarkMode()
      }
    })
  }
}
