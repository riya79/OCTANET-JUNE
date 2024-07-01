function addTask() {
    const taskName = document.getElementById('taskName').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
    const labels = document.getElementById('labels').value;
    const category = document.getElementById('category').value;

    if (!taskName || !deadline || !priority || !category) {
        alert('Please fill in all fields');
        return;
    }

    const task = {
        taskName,
        deadline,
        priority,
        labels,
        category,
        completion: 0,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function displayTasks() {
    const tasks = getTasks();
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.completed) {
            taskDiv.classList.add('completed');
        }

        let priorityClass = '';
        switch (task.priority) {
            case 'High':
                priorityClass = 'priority-high';
                break;
            case 'Medium':
                priorityClass = 'priority-medium';
                break;
            case 'Low':
                priorityClass = 'priority-low';
                break;
        }

        taskDiv.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})">
            <div class="info">
                <strong>${task.taskName}</strong> 
                <span>${task.deadline}</span> 
                <span class="${priorityClass}">${task.priority}</span> 
                <span>${task.labels}</span> 
                <span>${task.category}</span>
                <input type="range" min="0" max="100" value="${task.completion}" onchange="updateCompletion(${index}, this.value)">
                <span>${task.completion}%</span>
            </div>
            <div class="buttons">
                <button id="editBtn_${index}" class="edit" onclick="editTask(${index})">Edit</button>
                <button class="remove" onclick="removeTask(${index})">Remove</button>
            </div>
            <span class="status-badge">${task.completed ? 'Completed' : 'Pending'}</span>
        `;

        tasksDiv.appendChild(taskDiv);

        // Disable edit button if task is completed
        if (task.completed) {
            const editButton = taskDiv.querySelector(`#editBtn_${index}`);
            editButton.disabled = true;
            editButton.classList.add('disabled'); // Optionally add a class for styling
        }
    });
}



function updateCompletion(index, value) {
    const tasks = getTasks();
    tasks[index].completion = value;

   
    if (value == 100) {
        tasks[index].completed = true;
    } else {
        tasks[index].completed = false;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


function removeTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const task = tasks[index];

    if (task.completed) {
         const editButton = document.getElementById(`editBtn_${index}`);
        editButton.disabled = true;
        editButton.classList.add('disabled'); 
    } else {
       
        document.getElementById('taskName').value = task.taskName;
        document.getElementById('deadline').value = task.deadline;
        document.getElementById('priority').value = task.priority;
        document.getElementById('labels').value = task.labels;
        document.getElementById('category').value = task.category;

      
        removeTask(index);
    }
}



function toggleComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;

   
    if (tasks[index].completed) {
        tasks[index].completion = 100;
    } else {
        tasks[index].completion = 0; 
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}


document.addEventListener('DOMContentLoaded', displayTasks);
