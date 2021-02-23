const todos = JSON.parse(localStorage.getItem('todos')) || [];
const countTask = document.getElementById('count-task');

countTask.innerHTML = 'Tareas: ' + todos.length || 0;

const render = () => {
	const todosList = document.getElementById('todo-list');
	const todosTemplate = todos.map(
		(t) =>
			`<li><label>${t}</label> <i class="far fa-edit" id="edit"></i> <i class="far fa-trash-alt"></i></li>`
	);
	todosList.innerHTML = todosTemplate.join('');
	const elementos = document.querySelectorAll('#todo-list li');

	elementos.forEach((elemento, i) => {
		//leer el evento click
		elemento.children[2].addEventListener('click', () => {
			elemento.parentNode.removeChild(elemento);
			todos.splice(i, 1);
			actualizaTodos(todos);
			render();
		});
		elemento.children[1].addEventListener('click', async () => {
			await editarNota(elemento, i);
		});
	});
};

const actualizaTodos = (todos) => {
	const todosString = JSON.stringify(todos);
	localStorage.setItem('todos', todosString);
	countTask.innerHTML = 'Tareas: ' + todos.length;
};

window.onload = () => {
	render();
	const form = document.getElementById('todo-form');
	form.onsubmit = (e) => {
		e.preventDefault();
		const todo = document.getElementById('todo');
		if (!todo.value) {
			return;
		}
		const todoText = todo.value;
		todo.value = '';
		todos.push(todoText);
		actualizaTodos(todos);
		render();
	};
};

function editarNota(elemento, index) {
	//Obtenemos los elementos necesarios
	const update_form = document.getElementById('update-form');
	const note_input = document.getElementById('update');
	const btn_update = document.getElementById('btn-update');

	//Mostramos el cuadro de entrada de texto, con el texto del elemento que actualizaremos
	update_form.classList.remove('hidden');
	note_input.value = elemento.children[0].innerHTML;

	btn_update.addEventListener('click', (e) => {
		e.preventDefault();

		//Esperamos el click y luego actualizamos los valores
		elemento.children[0].innerHTML = note_input.value;
		todos[index] = note_input.value;

		update_form.classList.add('hidden');
		actualizaTodos(todos);
		render();
	});
}
