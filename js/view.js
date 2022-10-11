import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from "./components/filters.js";

export default class View {
    constructor() {
        this.model = null;
        this.table = document.querySelector("#table");
        this.tbody = document.querySelector("tbody");

        this.addTodoForm = new AddTodo();
        this.addTodoForm.onClick((title, description) => {
            this.addTodo(title, description);
        });

        this.modal = new Modal();
        this.modal.onClick((id, values) => {
            this.editTodo(id, values);
        });

        this.filters = new Filters();
        this.filters.onClick((filters) => {
            this.filter(filters);
        });
    }

    setModel(model) {
        this.model = model;
    }

    render() {
        const todos = this.model.getTodos();
        if (todos) todos.forEach((todo) => this.createRow(todo));
    }

    updateTable() {
        this.tbody.innerHTML = "";
        this.render();
    }

    filter(filters) {
        const { type, words } = filters;
        const [, ...rows] = this.table.getElementsByTagName("tr");

        rows.forEach((row) => {
            let shouldHide = false;
            const [title, description, completed] = row.children;
            const shouldBeCompleted = type === "completed";
            const isCompleted = completed.children[0].checked;

            if (words) {
                shouldHide =
                    !title.textContent.toLowerCase().includes(words) &&
                    !description.textContent.toLowerCase().includes(words);
            }

            if (type !== "all" && shouldBeCompleted !== isCompleted) {
                shouldHide = true;
            }

            if (shouldHide) {
                row.classList.add("d-none");
            }

            if (!shouldHide) {
                row.classList.remove("d-none");
            }
        });
    }

    addTodo(title, description) {
        const todo = this.model.addTodo(title, description);
        this.createRow(todo);
    }

    createRow(todo) {
        const tRow = table.insertRow();
        tRow.setAttribute("id", todo.id);
        tRow.innerHTML = `
        <td>${todo.title}</td>
        <td>${todo.description}</td>
        <td class="text-center"></td>
        <td class="text-right"></td>
    `;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => {
            this.toggleCompleted(todo.id);
        });
        tRow.children[2].appendChild(checkbox);

        const editBtn = document.createElement("button");
        editBtn.setAttribute("data-toggle", "modal");
        editBtn.setAttribute("data-target", "#modal");
        editBtn.classList.add("btn", "btn-primary", "mb-1");
        editBtn.innerHTML = `<i class="fa fa-pencil"></i>`;
        editBtn.addEventListener("click", () => {
            this.modal.setValues(todo);
        });
        tRow.children[3].appendChild(editBtn);

        const deleteRowBtn = document.createElement("button");
        deleteRowBtn.classList.add("btn", "btn-danger", "mb-1", "ml-1");
        deleteRowBtn.innerHTML = `<i class="fa fa-trash"></i>`;
        deleteRowBtn.addEventListener("click", () => {
            this.removeTodo(todo.id);
        });
        tRow.children[3].appendChild(deleteRowBtn);

        this.tbody.appendChild(tRow);
    }

    removeTodo(id) {
        this.model.removeTodo(id);
        document.getElementById(id).remove();
    }

    toggleCompleted(id) {
        this.model.toggleCompleted(id);
    }

    editTodo(id, values) {
        this.model.editTodo(id, values);
        this.updateTable();
    }
}
