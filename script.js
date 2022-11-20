// //id olduğu için # koyduk class olsa . koyacaktık
const from = document.querySelector('#addTaskForm') //bütün formları alıp en üsttekini getireecek
//console.log(from)

const input = document.querySelector('#txtTaskName') //bu id ile eşleşen ilkini getirecek

const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
// //console.log(taskList)

let items
var editingItem

eventListener()

function eventListener() {
  //form submit event
  from.addEventListener('submit', addNewItem)
  //delete an item
  taskList.addEventListener('click', deleteItem)
  //delete all item
  btnDeleteAll.addEventListener('click', deleteAllItem)
  //update an item
  taskList.addEventListener('click', updateItem)
}

function deleteAllItem(e) {
  if (confirm('Are you sure?')) {
    //silmek için 1. yöntem
    // taskList.innerHTML = ''

    //silmek için 2. ymntem
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }

  e.preventDefault()
}

function deleteItem(e) {
  //console.log(e)
  if (e.target.className === 'bi bi-x-circle') {
    //console.log("i elemntine tıklandı");
    if (confirm('Are you sure?')) {
      // console.log(e)
      e.target.parentElement.parentElement.remove()
    }
  }
}

var isEdit = false

function updateItem(e) {
  console.log(e)
  //console.log(editingItem.parentElement.parentElement.firstChild.data)
  if (e.target.className == 'bi bi-pencil-square') {
    input.value = e.target.parentElement.parentElement.firstChild.data
    editingItem = e.target
    isEdit = true
  }
}

function addNewItem(e) {
  e.preventDefault()
  // console.log(e)
  if (input.value === '') {
    alert('Please type a task!')
    return
  }
  if (!isEdit) {
    const li = document.createElement('li')
    li.classList = 'list-group-item list-group-item-secondary'
    li.appendChild(document.createTextNode(input.value))

    const a = document.createElement('a')
    a.classList = 'delete-item float-end'
    a.setAttribute('href', '#')
    a.innerHTML = '<i class="bi bi-x-circle"></i>'

    const a1 = document.createElement('a')
    a1.classList = 'edit-item float-end'
    a1.setAttribute('href', '#')
    a1.innerHTML = '<i class="bi bi-pencil-square"></i>'

    li.appendChild(a)
    li.appendChild(a1)
    taskList.appendChild(li)
    console.log(input.value)
  } else {
    editingItem.parentElement.parentElement.firstChild.data = input.value
    isEdit = false
  }
}
