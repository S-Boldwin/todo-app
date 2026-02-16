const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput")
const taskList = document.getElementById("taskList");

let tasks=[];

function addTask(){
    const taskText = taskInput.value;
    if (taskText ===''){
        alert("Please enter a task!");
        return;
    }

    const task = {
        id : Date.now(),
        text : taskText,
        completed : false,
        createdAt : new Date().toLocaleDateString()
    };
    tasks.push(task);
    taskInput.value = '';

    displayTasks();
    saveTasks();
}

function displayTasks(){
    taskList.innerHTML = "";
    tasks.forEach((task,index) =>{
        const taskItem = createTaskElement(task,index);
        taskList.appendChild(taskItem);
    });
}

function createTaskElement(task,index){
    const taskItem = document.createElement("li");
    if (task.completed){
            taskItem.style.textDecoration = "line-through";
            taskItem.style.color = "#999";
        }
    taskItem.innerHTML = `
        <input type="checkbox" onchange = "toggleComplete(${index})" ${task.completed ? "checked": ""}>           
        <span>${task.text}</span>
        <button onclick = "deleteTask(${index})">Delete</button>
        
    `;

    
    return taskItem
}

function toggleComplete(index){
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
    saveTasks();
}

function deleteTask(index){
    tasks.splice(index,1);
    displayTasks();
    saveTasks();
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function loadTasks(){
    const saved = localStorage.getItem("tasks");
    if (saved){
        tasks = JSON.parse(saved);
        displayTasks();
    }
}

taskInput.addEventListener("keydown",(e)=>{
    if (e.key ==="Enter"){
        addTask();
    }
})
addBtn.addEventListener("click",addTask);
loadTasks();