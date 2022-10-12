export default class DeleteModal {
    constructor() {
        this.confirmBtn = document.querySelector("#d-modal-btn");
        this.id = null;
    }

    setValues(todo) {
        this.id = todo.id;
    }

    onClick(callback) {
        this.confirmBtn.addEventListener("click", () => {
            callback(this.id);
            $("#delete-modal").modal("toggle");
        });
    }
}
