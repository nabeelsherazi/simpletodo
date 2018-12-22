const todo = document.getElementById("todo"); // ul object
const done = document.getElementById("done"); // also ul object
const isPriority = document.getElementById("isPriority"); // input checkbox object
const newTodoText = document.getElementById("newTodoText"); // input text object
const addTodoButton = document.getElementById("addTodo"); // button object
const keyIsActive = {};

function addTodo() {
  // Get todo text
  let todoText = newTodoText.value;
  if (!todoText) {
    return; // Do nothing if empty
  }
  let newTodo = document.createElement("li");
  let checkbox = document.createElement("input");
  let priority = isPriority.checked;
  // Reset priority checkbox
  isPriority.checked = false;
  checkbox.type = "checkbox";
  checkbox.addEventListener("click", markTodoDone);
  newTodo.appendChild(checkbox);
  // Reset todo text input
  newTodoText.value = "";
  // Create text node and append
  newTodo.appendChild(document.createTextNode(todoText));
  if (priority) {
    newTodo.classList.add("priority");
    todo.insertBefore(newTodo, todo.children[0]);
  } else {
    todo.appendChild(newTodo);
  }
}

function markTodoDone(event) {
  let calledTodo = event.target.parentElement;
  done.appendChild(calledTodo);
  calledTodo.firstChild.disabled = true;
  if (done.children.length == 0) {
    done.parentElement.classList.add("hidden");
  } else {
    done.parentElement.classList.remove("hidden");
  }
}

function keyHandler(event) {
  // Handle key ups and downs
  if (event.type == "keydown") {
    keyIsActive[event.key] = true;
  }
  if (event.type == "keyup") {
    keyIsActive[event.key] = false;
  }

  // Check conditions
  if (keyIsActive["Enter"] && document.activeElement == newTodoText) {
    addTodo();
  }

  if (keyIsActive["Control"] && keyIsActive["Alt"] && keyIsActive["p"]) {
    // Control + Alt + P to toggle priority
    isPriority.checked = !isPriority.checked;
  }
}

function clearAllKeys() {
  for (let key in keyIsActive) {
    keyIsActive[key] = false;
  }
}

// Initialize

addTodoButton.addEventListener("click", addTodo);
window.addEventListener("keydown", keyHandler);
window.addEventListener("keyup", keyHandler);
window.addEventListener("onblur", clearAllKeys); // Clear state on tab switch
