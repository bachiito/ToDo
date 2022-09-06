export default class Model {
  constructor() {
    this.view = null;
    this.todos = JSON.parse(localStorage.getItem("todos"));
    this.currentId = !this.todos ? 1 : this.todos[this.todos.length - 1].id + 1;
  }

  setView(view) {
    this.view = view;
  }

  getTodos() {
    return this.todos;
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  findTodo(id) {
    return this.todos.findIndex((todo) => todo.id === id);
  }

  addTodo(title, description) {
    const todo = {
      id: this.currentId++,
      title,
      description,
      completed: false,
    };

    if (this.todos === null) {
      this.todos = [];
    }

    this.todos.push(todo);
    this.save();

    return { ...todo }; // A copy of the object
  }

  removeTodo(id) {
    const todoIndex = this.findTodo(id);
    this.todos.splice(todoIndex, 1);
    this.save();
  }

  toggleCompleted(id) {
    const todoIndex = this.findTodo(id);
    const todo = this.todos[todoIndex];
    todo.completed = !todo.completed;
    this.save();
  }

  editTodo(id, values) {
    const todoIndex = this.findTodo(id);

    const todo = this.todos[todoIndex];
    todo.title = values.title;
    todo.description = values.description;
    todo.completed = values.completed;

    this.save();
  }
}
