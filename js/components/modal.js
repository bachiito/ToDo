export default class Modal {
    constructor() {
        this.title = document.querySelector("#modal-title");
        this.description = document.querySelector("#modal-description");
        this.btn = document.querySelector("#modal-btn");
        this.completed = document.querySelector("#modal-completed");
        this.alert = document.querySelector("#modal-alert");
        this.todo = null;
    }

    setValues(todo) {
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

    onClick(callback) {
        this.btn.addEventListener("click", () => {
            if (!this.title.value || !this.description.value) {
                this.alert.classList.remove("d-none");
                this.alert.textContent = "Title and description are required.";
                return;
            }

            this.alert.classList.add("d-none");

            callback(this.todo.id, {
                title: this.title.value,
                description: this.description.value,
                completed: this.completed.checked,
            });

            $("#modal").modal("toggle");
        });
    }
}
