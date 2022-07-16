import { renderTodos } from "./views";
import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";

renderTodos();

document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderTodos();
});

document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();
  const text = e.target.elements.text.value.trim();

  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.text.value = "";
  }
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
  renderTodos();
});

window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});

///// play with a date //////

// const now1 = new Date("march 22 2002 10:59:40");
// const now2 = new Date("october 3 2015 20:15:03");

// const timeStamp1 = now1.getTime();
// const timeStamp2 = now2.getTime();

// const myDate1 = new Date(timeStamp1);
// const myDate2 = new Date(timeStamp2);

// if (timeStamp1 > timeStamp2) {
//   console.log(myDate1);
// } else {
//   console.log(myDate2);
// }

///// play with a date using Moment  //////

// const birthday = moment();
// birthday.set({ year: 1999, month: 7, date: 02 });
// console.log(birthday.format("MMM D, YYYY"));
