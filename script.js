// //id olduğu için # koyduk class olsa . koyacaktık
const from = document.querySelector('#addTaskForm') //bütün formları alıp en üsttekini getireecek
//console.log(from)

const input = document.querySelector('#txtTaskName') //bu id ile eşleşen ilkini getirecek

const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
// //console.log(taskList)

let items
var editingItem
loadItems()
eventListener()

function eventListener() {
  //form submit event
  from.addEventListener('submit', addNewItem)
  //delete an item
  taskList.addEventListener('click', deleteItem)
  //delete all item
  btnDeleteAll.addEventListener('click', deleteAllItem)
  //update an item
  taskList.addEventListener('click', editItem)
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
  localStorage.clear()

  e.preventDefault()
}

function deleteItem(e) {
  //console.log(e)
  if (e.target.className === 'bi bi-x-circle') {
    //console.log("i elemntine tıklandı");
    if (confirm('Are you sure?')) {
      // console.log(e)
      e.target.parentElement.parentElement.remove()

      //localestoragedan silme
      deleteItemFromLS(e.target.parentElement.parentElement.textContent)
    }
  }
}

var isEdit = false
var index1
function editItem(e) {
  console.log(e)
  //console.log(editingItem.parentElement.parentElement.firstChild.data)
  if (e.target.className == 'bi bi-pencil-square') {
    //  input.value = e.target.parentElement.parentElement.firstChild.data
    input.value = e.target.parentElement.parentElement.innerText
    //updateLS
    index1 = getItemIndexFromLS(input.value)

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
    createItem(input.value)
    setItemToLS(input.value)
    input.value = ''
  } else {
      updateItem();
   
  }
}

function updateItem() {
    //updateItem
    editingItem.parentElement.parentElement.firstChild.data = input.value
    //updateLocalStorage
    items = getItemsFromLS()
    items[index1] = input.value
    localStorage.setItem('tasks', JSON.stringify(items))
    input.value = ''
    isEdit = false 
}

function createItem(text) {
  const li = document.createElement('li')
  li.classList = 'list-group-item list-group-item-secondary'
  li.appendChild(document.createTextNode(text))

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
  console.log(text)
}
function setItemToLS(text) {
  items = getItemsFromLS()
  items.push(text)
  localStorage.setItem('tasks', JSON.stringify(items))
}
function getItemsFromLS() {
  if (localStorage.getItem('tasks') === null) items = []
  else items = JSON.parse(localStorage.getItem('tasks'))
  return items
}
//updateitem için eklendi --berna
function getItemIndexFromLS(text) {
  // var aranilanIndex;
  items = getItemsFromLS()
  items.forEach(function (todo, index) {
    if (todo === text) {
      index1 = index
    }
  })
  return index1
}
function deleteItemFromLS(text) {
  items = getItemsFromLS()
  items.forEach(function (todo, index) {
    if (todo === text) {
      items.splice(index, 1)
    }
  })
  localStorage.setItem('tasks', JSON.stringify(items))
}

function loadItems() {
  items = getItemsFromLS()
  items.forEach(function (todo) {
    createItem(todo)
  })
}
