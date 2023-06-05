function createNewTaskForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Новое дело';
    button.classList.add('btn', 'btn-outline-dark', 'add-task');
    button.textContent = 'Добавить дело';
    button.type = 'submit';

    form.append(input);
    form.append(button);

    return {
        form,
        input,
        button,
    }
}

var savedTasks = [];
savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];

function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');

    savedTasks.forEach(element => {
        let task = createTask(element.name, element.done, false);
        list.append(task);
    });
    return list;
}

function createTask(name, done = false, refresh = true) {

    let item = document.createElement('li');
    let itemGroup = document.createElement('div');
    let checkInput = document.createElement('input');
    let deleteBtn = document.createElement('button');

    itemGroup.classList.add('input-group', 'mb-1');

    item.classList.add('list-group-item');
    item.textContent = name;

    checkInput.classList.add('form-check-input', 'me-2');
    checkInput.type = 'checkbox';
    checkInput.checked = done;
    if (done) {
        item.classList.add('task-done');
    }
    checkInput.addEventListener('click', function () {
        this.parentElement.classList.toggle('task-done');
        let done = checkInput.checked;
        refreshLocalStorage({ name, done }, 'refresh');
    })

    deleteBtn.type = 'button';
    deleteBtn.classList.add('btn', 'btn-outline-secondary');
    deleteBtn.textContent = 'x';
    deleteBtn.addEventListener('click', function () {
        if (confirm('Удалить элемент из списка?')) {
            let done = checkInput.checked;
            refreshLocalStorage({ name, done }, 'remove');
            itemGroup.remove();
        }
    });

    item.insertAdjacentElement('afterbegin', checkInput);
    itemGroup.append(item);
    itemGroup.append(deleteBtn);
    if (refresh) {
        refreshLocalStorage({ name, done }, 'add');
    }

    return itemGroup;

}
// <div class="input-group mb-1">
//     <li class="list-group-item ">
//         <input class="form-check-input" type="checkbox" value="" aria-label="...">
//             First checkbox
//             
//     </li>
//     <button class="btn btn-outline-secondary" type="button">x</button>
// </div>


function createTodoApp(containerClass = '.todo-app',) {
    let container = document.querySelector(containerClass);
    let newTaskForm = createNewTaskForm();
    let todoList = createTodoList();
    container.append(newTaskForm.form);
    container.append(todoList);

    newTaskForm.form.addEventListener('submit', function (e) {
        e.preventDefault();

        savedTasks.forEach(element => {
            if (element.name == newTaskForm.input.value) {
                newTaskForm.input.value = '';
                return;
            }
        });

        if (!newTaskForm.input.value) { return };


        let task = createTask(newTaskForm.input.value);

        todoList.append(task);
        newTaskForm.input.value = '';
    })
}


function refreshLocalStorage(task, operation) {
    console.log(`task ${task.name}:${task.done} ${operation}`);
    savedTasks = JSON.parse(localStorage.getItem('savedTasks')) || [];
    if (operation == 'add') {
        savedTasks.push(task);
        console.log('adding');
    } else {
        savedTasks.forEach(element => {
            if (element.name == task.name) {
                index = savedTasks.indexOf(element);
                console.log(index);
                if (operation == 'remove') {
                    savedTasks.splice(index, 1);
                    console.log('removing');
                } else {
                    savedTasks[index] = task;
                    console.log('refreshing');
                }
            }
        });
    }
    localStorage.removeItem('savedTasks');
    localStorage.setItem('savedTasks', JSON.stringify(savedTasks))
}


document.addEventListener('DOMContentLoaded', function () {
    createTodoApp();
});