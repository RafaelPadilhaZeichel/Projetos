const form = document.querySelector("#todo-form");
const taskTittleInput = document.querySelector("#task-tittle-input");
const todoList = document.querySelector("#todo-list-ul");

let tasks = []; // Precisa ser um Array de objetos [{tittle: ''Tarefa 1, done: false}, ....]

function renderTaskOnHTML(taskTittle, done = false) {
  // Adicionando a nova tarefa no HTML
  const li = document.createElement("li");

  // Checkbox de concluída
  const input = document.createElement("input"); // Criando o input
  input.setAttribute("type", "checkbox"); // Adicionando o type igual a checkbox
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;

    const spanToToggle = liToToggle.querySelector("span");

    const done = event.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.tittle === spanToToggle.textContent) {
        return {
          tittle: t.tittle,
          done: !t.done,
        };
      }
      return t;
    });

    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;

  // Texto digitado no input
  const span = document.createElement("span");
  span.textContent = taskTittle;

  if (done) {
    span.style.textDecoration = "line-through";
  }

  // Button de remove
  const button = document.createElement("button");
  button.textContent = "remover";
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;

    const tittleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.tittle !== tittleToRemove);

    todoList.removeChild(liToRemove);
    console.log(tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoList.appendChild(li);
}

window.onload = () => {
    const taskOnLocalStorage = localStorage.getItem("tasks");
  
    if (!taskOnLocalStorage) return;
  
    tasks = JSON.parse(taskOnLocalStorage);
  
    tasks.forEach((t) => {
      renderTaskOnHTML(t.tittle, t.done); // Passando o estado 'done' para a função
    });
  };

form.addEventListener("submit", (event) => {
  event.preventDefault(); //Esse método evita o comportamento padrão de recarregar a página ao submeter o formulário

  const taskTittle = taskTittleInput.value;

  if (taskTittle.length < 3) {
    alert("Sua tarefa precisa ter mais caracteres...");
    return;
  }

  // Adicionando a nova tarefa no Array de tasks
  tasks.push({
    tittle: taskTittle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Adicionando a nova tarefa no HTML
  renderTaskOnHTML(taskTittle);

  taskTittleInput.value = "";
});
