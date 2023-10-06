
// ALL ELEMENT
const search = document.getElementById('search-input'); 
const todo = document.getElementById('todo-input'); 
const addTodo = document.getElementById('add-todo'); 
const todoList = document.getElementById('todo-list'); 




const getSavedTodo = getLocalStorageData('todo') != null? getLocalStorageData('todo') : [];
showTodo(getSavedTodo)
checkedTodo()


// SEARCH TODO
function searchTodo(key){
    const localData = getLocalStorageData('todo') != null? getLocalStorageData('todo') : [];
    const filterData = localData.filter(task => task.todo.toLowerCase().includes(key.toLowerCase()));

    return filterData;
}

search.addEventListener('keyup', function(event){
    const keyword = event.target.value
    const searchList = searchTodo(keyword);
    if(searchList == ''){
        alert('No Task added')
        search.value = ''
    } else{
        showTodo(searchList);
    }
})




// set todo with click 
addTodo.addEventListener('click', ()=>{
    const todoValue = todo.value;
    if(todoValue ==''){
        alert('Please Add Task')
    } else{
        const updateArray =  addData(todoValue)
        setLocalStorageData(updateArray)
        showTodo(updateArray)
        todo.value = '';
        checkedTodo();
    }
})


// set todo with enter
todo.addEventListener('keyup', function(event){
    const todoValue = todo.value;
    if(todoValue ==''){
        alert('Please Add Task')
    } else if (event.key == 'Enter' ){
        const todoValue = todo.value;
        const updateArray =  addData(todoValue)
        setLocalStorageData(updateArray)
        showTodo(updateArray)
        todo.value = '';
        checkedTodo();
    }
})


// COMPLITED TASK
function checkedTodo(){
    const taskStatus = document.querySelectorAll('.change-status');

    taskStatus.forEach( function(e){
        e.addEventListener('change', function(event){
            const checkedInput = event.target.checked;
            const dataId = event.target.parentElement.getAttribute('data-id');
            const status = checkedInput? "complited" : 'incomplete';

           

            // set new time
            const d = new Date()
            const time = d.toLocaleDateString('en-us', {
                'minute' : 'numeric'
            });

            const getLists = getLocalStorageData('todo') != null? getLocalStorageData('todo') : [];
          const updateList = getLists.map(function(todo){
                if(todo.id == dataId){
                    return{...todo, isComplit: status, end_date:time}
                    
                }
                return todo;
            });

            setLocalStorageData(updateList);
            showTodo(updateList);

        })
    })
}





// add data to array
function addData(task_name){
    const d = new Date()
    const time = d.toLocaleDateString('en-us', {
    });
    const object = {id: Math.random(), todo: task_name, isComplit:'incomplited', startDate: time, end_date: ''}
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
    const d = new Date()
    const time = d.toLocaleDateString('en-us', {
        hour : 'numeric'
    });

 



    let data = ''
    value.map(task =>{
      data +=`<tr class="mystyle">
            <td data-id=${task.id}>
              <input type="checkbox" class="change-status" ${task.isComplit =='complited'? 'checked':''}>
             </td>
            <td>${task.todo}</td>
            <td>${task.startDate}</td>
            <td>${task.isComplit =='complited'?  time : 'X'}</td>
        </tr>`
    })

    todoList.innerHTML = data
}