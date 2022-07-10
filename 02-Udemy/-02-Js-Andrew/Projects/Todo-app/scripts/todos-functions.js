"use strict";

// Featch existing todos from LocalStorage
const getSavedTodos = () => {
  const todoJson = localStorage.getItem("todo");

  try {
    return todoJson ? JSON.parse(todoJson) : [];
  } catch (e) {
    return [];
  }
};

// Save Todos
const saveTodos = (todos) => {
  localStorage.setItem("todo", JSON.stringify(todos));
};

// Remove Todo from list by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id == id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle Todo
const toggleTodo = (id) => {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Rander application
const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector("#todo");
  let filterTodo = todos.filter((todo) => {
    const SearchTextMatch = todo.text
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return SearchTextMatch && hideCompletedMatch;
  });

  const inCompleteTodos = filterTodo.filter((todo) => !todo.completed);

  /////////

  todoEl.innerHTML = "";
  todoEl.appendChild(generateSummaryDOM(inCompleteTodos));

  if (filterTodo.length > 0) {
    filterTodo.forEach((todo) => {
      todoEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "There are no to-dos to show";
    todoEl.appendChild(messageEl);
  }
};

// Get the Dom elements
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkboox = document.createElement("input");
  const todoText = document.createElement("spane");
  const removeButton = document.createElement("button");

  // Setup CheckBox
  checkboox.setAttribute("type", "checkbox");
  checkboox.checked = todo.completed;
  containerEl.appendChild(checkboox);
  checkboox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup Container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = `remove`;
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM summary
const generateSummaryDOM = (inCompleteTodos) => {
  const summary = document.createElement("h2");
  const plural = inCompleteTodos.length === 1 ? " " : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${inCompleteTodos.length} todo${plural} left`;
  return summary;
};
