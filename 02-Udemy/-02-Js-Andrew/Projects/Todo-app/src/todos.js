import { v4 as uuidv4 } from "uuid";

let todos = [];

// Featch existing todos from LocalStorage
const loadTodos = () => {
  const todoJson = localStorage.getItem("todo");

  try {
    todos = todoJson ? JSON.parse(todoJson) : [];
  } catch (e) {
    todos = [];
  }
};

// Save Todos
const saveTodos = () => {
  localStorage.setItem("todo", JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = (text) => {
  todos.push({
    id: uuidv4(),
    text,
    completed: false,
  });
  saveTodos();
};

const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    saveTodos();
  }
};

// Toggle Todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

loadTodos();

export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo };
// Make sure to call loadTodos and setup the exports
