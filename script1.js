let todo=JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const addButton=document.querySelector(".btn")
const deleteButton = document.getElementById("deleteButton");
const todoList=document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");


document.addEventListener("DOMContentLoaded", function(){
    console.log("document click")
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event) {
        if(event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});



function displayTasks(){
    todoList.innerHTML=""

    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}"${ item.disabled ? "checked" :""}>

                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""

                }"onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener("click",
             ()=> toggleTask(index)
        );
        todoList.appendChild(p);
    });
    todoCount.textContent = todo.lenght
}

function saveToLocalStorage(){
    //  luu vao trang web
    localStorage.setItem("todo", JSON.stringify(todo));
}
function deleteAllTasks(){
    // xoa toan bo task
    todo =[];
    saveToLocalStorage();
    displayTasks();
}

function toggleTask(index){
    // chuyen trang thai task
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}
function editTask(index){
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function () {
        const updatedText = inputElement.value.trim();
        if(updatedText){
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

function addTask(){
    console.log("addTask - button click")
    const newTask = todoInput.value.trim();
    if (newTask != ""){
        todo.push({text: newTask, disabled:false});
        saveToLocalStorage();
        todoInput.value ="";
        displayTasks();
    }

}