const todos = JSON.parse(localStorage.getItem("todos")) || [];
const countTask= document.getElementById('count-task');

countTask.innerHTML = "Tareas: " + todos.length || 0;


const render = () => {
    const todosList = document.getElementById("todo-list");
    const todosTemplate = todos.map((t) => `<li>${t}</li>`);
    todosList.innerHTML = todosTemplate.join("");
    const elementos = document.querySelectorAll("#todo-list li");
    elementos.forEach((elemento, i) => {
        //leer el envento click
        elemento.addEventListener("click", () => {
            elemento.parentNode.removeChild(elemento);
            todos.splice(i, 1);
            actualizaTodos(todos);
            render();
        });
    });
};

const actualizaTodos = (todos) => {
    const todosString = JSON.stringify(todos);
    localStorage.setItem("todos", todosString);
    countTask.innerHTML = "Tareas: " + todos.length;
};

window.onload = () => {
    render();
    const form = document.getElementById("todo-form");
    form.onsubmit = (e) => {
        e.preventDefault();
        const todo = document.getElementById("todo");
        console.log(todo);
        if (!todo.value) {
            return;
        }
        const todoText = todo.value;
        todo.value = "";
        todos.push(todoText);
        actualizaTodos(todos);
        render();
    };
};