export default function components() {
  const filterTab = document.querySelectorAll(".filter-tab")
  filterTab.forEach((filterTabEl) => {
    const tabItem = filterTabEl.querySelectorAll(".tab-item")
    const tabContent = filterTabEl.querySelectorAll(".tab-content")
    const tabContentParent = filterTabEl.querySelector(".filter-tab-content")
    let filterTabAnimation = filterTabEl.getAttribute("data-filter-animation")
    filterTabEl.classList.add(`filter-tab--${filterTabAnimation}`)

    tabItem.forEach((tabItemEl) => {
      tabItemEl.addEventListener("click", (e) => {
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
      })
    })
  })
}
