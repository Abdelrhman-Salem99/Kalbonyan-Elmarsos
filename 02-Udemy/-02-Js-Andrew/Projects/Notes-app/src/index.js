import { createNotes } from "./notes.js";
import { setFilters } from "./filters.js";
import { renderNotes } from "./views.js";

renderNotes();

document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = createNotes();
  location.assign(`edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  setFilters({
    searchText: e.target.value,
  });
  renderNotes();
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  setFilters({
    sortBy: e.target.value,
  });
  renderNotes();
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    renderNotes();
  }
});
