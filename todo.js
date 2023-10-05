
// all section

const search = document.getElementById('search-input'); 
const todo = document.getElementById('todo-input'); 
const addTodo = document.getElementById('add-todo'); 
const todoList = document.getElementById('todo-list'); 




const getSavedTodo = getLocalStorageData('todo') != null? getLocalStorageData('todo') : [];
showTodo(getSavedTodo)



// search todo
function searchTodo(key){
    const localData = getLocalStorageData('todo') != null? getLocalStorageData('todo') : [];
    const filterData = localData.filter(task => task.todo.toLowerCase().includes(key.toLowerCase()));

    return filterData;
}

search.addEventListener('keyup', function(event){
    const keyword = event.target.value;
    const searchList = searchTodo(keyword);
    showTodo(searchList);
})




// set todo with click 
addTodo.addEventListener('click', ()=>{
    const todoValue = todo.value;
    const updateArray =  addData(todoValue)
    setLocalStorageData(updateArray)
    showTodo(updateArray)
    todo.value = '';
})



// set todo with enter
todo.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const todoValue = todo.value;
        const updateArray =  addData(todoValue)
        setLocalStorageData(updateArray)
        showTodo(updateArray)
        todo.value = '';
    }
})






// add data to array
function addData(task_name){
    const d = new Date()
    const time = d.toLocaleDateString('en-us', {
 
    })
    const object = {id: Math.random(), todo: task_name, startDate: time}
    const getLocalData = getLocalStorageData('todo') 
    if(getLocalData === null || getLocalData ===""){
        return [object]
      } else{
        const newArray = [...getLocalData, object]
        return newArray
      }

}



// GET DATA FROM LOCAL STORAGE
function getLocalStorageData(todo){
    const data = localStorage.getItem(todo);
    return JSON.parse(data)
}

// SET DATA IN LOCAL STORAGE
function setLocalStorageData(setData){
    const data = JSON.stringify(setData)
     localStorage.setItem('todo', data)
}


// show todo into dom
function showTodo(value){
    let data = ' '
    value.map(task =>{
      data +=`<tr data-id=${task.id}>
            <td><input type="checkbox" name="" id=""> </td>
            <td>${task.todo}</td>
            <td>${task.startDate}</td>
            <td>X</td>
        </tr>`
    })

    todoList.innerHTML = data
}