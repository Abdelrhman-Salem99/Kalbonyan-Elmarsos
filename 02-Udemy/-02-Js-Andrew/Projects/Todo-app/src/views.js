import { getTodos, toggleTodo, removeTodo } from "./todos";
import { getFilters } from "./filters";

// Rander application
const renderTodos = () => {
  const todoEl = document.querySelector("#todo");
  const { searchText, hideCompleted } = getFilters();
  let filterTodo = getTodos().filter((todo) => {
    const SearchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
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

// Get the Dom elements for individual note
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
    renderTodos();
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
    renderTodos();
  });

  return todoEl;
};

// Get the DOM element for list summary
const generateSummaryDOM = (inCompleteTodos) => {
  const summary = document.createElement("h2");
  const plural = inCompleteTodos.length === 1 ? " " : "s";
  summary.classList.add("list-title");
  summary.textContent = `You have ${inCompleteTodos.length} todo${plural} left`;
  return summary;
};

// Make sure to set up the exports
export { generateTodoDOM, renderTodos, generateSummaryDOM };
