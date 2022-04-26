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
  const accordionContainer = document.querySelector(".accordion-container")
  if (accordionContainer) {
    new Accordion(accordionContainer, {
      duration: 400,
      showMultiple: false,
    })
  }

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
}
