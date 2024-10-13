// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Load existing tasks
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        const taskTextTrimmed = taskText.trim(); // Trim whitespace from task text

        if (save && taskTextTrimmed === "") {
            alert("Please enter a task."); // Alert if input is empty
            return; // Exit the function if no task is entered
        }

        // Create a new list item
        const li = document.createElement('li');
        li.textContent = taskTextTrimmed;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.className = 'remove-btn';

        // Add click event to remove the task
        removeButton.onclick = function() {
            taskList.removeChild(li); // Remove the li from taskList
            removeTaskFromStorage(taskTextTrimmed); // Remove from local storage
        };

        // Append the remove button to the list item and the list item to the task list
        li.appendChild(removeButton);
        taskList.appendChild(li);

        // Update Local Storage if saving
        if (save) {
            saveTaskToStorage(taskTextTrimmed);
        }

        // Clear the input field
        taskInput.value = "";
    }

    // Save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach event listeners
    addButton.addEventListener('click', () => addTask(taskInput.value)); // Add task on button click
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Add task on Enter key press
        }
    });
});
