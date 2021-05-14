var app = {
  load() {
    console.log("load");
  },
  resized() {
    console.log("resized");
  },

  init: function () {
    app.load();
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
