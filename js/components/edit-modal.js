export default class EditModal {
    constructor() {
        this.title = document.querySelector("#u-modal-title");
        this.description = document.querySelector("#u-modal-description");
        this.saveBtn = document.querySelector("#u-modal-btn");
        this.completed = document.querySelector("#u-modal-completed");
        this.alert = document.querySelector("#u-modal-alert");
        this.todo = null;
    }

    setValues(todo) {
        this.todo = todo;
        this.title.value = todo.title;
        this.description.value = todo.description;
        this.completed.checked = todo.completed;
    }

    onClick(callback) {
        this.saveBtn.addEventListener("click", () => {
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

            $("#edit-modal").modal("toggle");
        });
    }
}
