"use strict";
;
// The following code has an exclamation point after it to tell TypeScript to trust us that input is not null
// We also need to ass "as HTMLInputElement" because we need to tell TypeScript the type of element so we can use the .value method on input so we can get the element's value
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const form = document.getElementById("todoform");
const list = document.getElementById("todolist");
const todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    // Getting our item array that we're storing in localStorage using the "todos" key
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null) {
        return [];
    }
    ;
    return JSON.parse(todosJSON);
}
;
function saveTodos() {
    // Using local browser storage to store our todo array. The setItem() method takes a key, and a string to store in the browser
    localStorage.setItem("todos", JSON.stringify(todos));
}
;
// We want to prevent default, but to do that we have to tell TypeScript what kind of type "event" is
function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false
    };
    todos.push(newTodo);
    createTodo(newTodo);
    saveTodos();
    input.value = "";
}
;
function createTodo(todo) {
    const newLI = document.createElement("li");
    const checkbox = document.createElement("input");
    // This has nothing to do with TypeScript, we're just specifying what kind of input HTML element checkbox is so it shows up correctly on our web page
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        // The checkbox has a "checked" attribute that automatically sets to true or false depending on whether the box is checked or not
        todo.completed = checkbox.checked;
        saveTodos();
    });
    newLI.append(todo.text);
    newLI.append(checkbox);
    list?.append(newLI);
}
;
// Here we're saying: "If form is not null, then addEventListener()."
form?.addEventListener("submit", handleSubmit);
