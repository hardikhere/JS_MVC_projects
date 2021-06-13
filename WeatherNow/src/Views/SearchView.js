class SearchView {
  container = document.querySelector(".search_form");

  addSubmitController(controller) {
    if (typeof controller !== "function")
      throw new TypeError("controller must be function");
    this.container.addEventListener("submit", controller.bind(this));
  }

  clearForm() {
    this.container.querySelector(".search_input").value = "";
  }

  get query() {
    return this.container.querySelector(".search_input").value;
  }
}

export default new SearchView();
