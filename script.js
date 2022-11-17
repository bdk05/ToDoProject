//id olduğu için # koyduk class olsa . koyacaktık
const from=document.querySelector("#addTaskForm"); //bütün formları alıp en üsttekini getireecek

const input=document.querySelector("#txtTaskName"); //bu id ile eşleşen ilkini getirecek

const btnDeleteAll=document.getElementById("btnDeleteAll");
const taskList=document.getElementById("task-list");
console.log(taskList);
let items;

eventListener();

function eventListener() {
    //form submit event 
    from.addEventListener("submit",addNewItem);
    //delete an item
    //delete all item

    
}
function addNewItem(e) {
    e.preventDefault();
    console.log(e);
    if(input.value===''){
        alert("Please type a task!");
        return;
    }

    const li=document.createElement('li');
    li.classList='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(input.value));


    const a=document.createElement('a');
    a.classList='delete-item float-end';
    a.setAttribute('href', '#');
    a.innerHTML='<i class="bi  bi-x-circle"></i>';

    li.appendChild(a);
    taskList.appendChild(li);


    
}