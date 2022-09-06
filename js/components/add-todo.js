import Alert from "./alert.js";

export default class AddTodo {
  constructor() {
    this.btn = document.querySelector("#add");
    this.title = document.querySelector("#title");
    this.description = document.querySelector("#description");
    this.alert = new Alert("alert");
  }

  onClick(callback) {
    this.btn.addEventListener("click", () => {
      if (!this.title.value || !this.description.value) {
        this.alert.show("Title and description are required.");
        return;
      }

      this.alert.hide();
      callback(this.title.value, this.description.value);
    });
  }
}
