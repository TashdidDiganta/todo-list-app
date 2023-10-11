
// ALL ELEMENT
const search = document.getElementById('search-input'); 
const todo = document.getElementById('todo-input'); 
const addTodo = document.getElementById('add-todo'); 
const todoList = document.getElementById('todo-list'); 
const todoListTr = document.querySelector('#todo-list tbody'); 




const getSavedTodo = getLocalStorageData('todo') != null? getLocalStorageData('todo') : [];
showTodoList(getSavedTodo)
checkedTodo()
sortableRow()


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
        showTodoList(searchList);
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
        showTodoList(updateArray)
        // showTodo(todoValue)
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
        showTodoList(updateArray)
        // showTodo(todoValue)
        todo.value = '';
        checkedTodo();
        sortableRow();
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
            showTodoList(updateList);

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
function showTodoList(value){
    const d = new Date()
    const time = d.toLocaleDateString('en-us', {
        hour : 'numeric'
    });
    let data = `<tr class="top-header">
                <th class="task-icon">Status <img src="assets/check-mark.png" class="icon"  alt=""></th>
                <th class="task">Task</th>
                <th class="start-date">Start Date</th>
                <th class="end-date">End Date</th>
            </tr>`;

    value.map(task =>{
        if(task != null){
            data +=`<tr data-value='${JSON.stringify(task)}' class=${task.isComplit =='complited'?  'mystyle' : ''}>
                <td data-id=${task.id}>
                <input type="checkbox" class="change-status" ${task.isComplit =='complited'? 'checked':''}>
                </td>
                <td>${task.todo}</td>
                <td>${task.startDate}</td>
                <td>${task.isComplit =='complited'?  time : 'X'}</td>
            </tr>`
        }
    })
    todoList.innerHTML = data;
    checkedTodo();
}

// show todo into dom
function showTodo(value){
    const d = new Date()
    const time = d.toLocaleDateString('en-us', {
        hour : 'numeric'
    });
    const todo = {id: Math.ceil(Math.random() * 1000000), todo: value, isComplit:'incomplited', startDate: time, end_date: '' }

    let data = `<tr data-value='${JSON.stringify(todo)}' class=${todo.isComplit =='complited'?  'mystyle' : ''}>
            <td data-id=${todo.id}>
              <input type="checkbox" class="change-status" ${todo.isComplit =='complited'? 'checked':''}>
             </td>
            <td>${todo.todo}</td>
            <td>${todo.startDate}</td>
            <td>${todo.isComplit =='complited'?  time : 'X'}</td>
        </tr>`;

    todoList.innerHTML += data
    checkedTodo();
}

function sortableRow(){
    const todoRow = document.querySelectorAll('#todo-list tbody tr:not(.top-header)');
    const tBody = document.querySelector('#todo-list tbody'); 
    todoRow.forEach( el => {
        el.setAttribute('draggable', true);
        el.addEventListener("dragstart", () => {
            setTimeout( () => el.classList.add('dragging'), 0)
        });
        el.addEventListener("dragend", () => {
            el.classList.remove('dragging')
        });
    })

    const initSortableList = (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector(".dragging");
        // Getting all items except currently dragging and making array of them
        let siblings = [...tBody.querySelectorAll("#todo-list tbody tr:not(.dragging)")];
        // Finding the sibling after which the dragging item should be placed
        let nextSibling = siblings.find(sibling => {
            console.log(sibling.offsetTop + sibling.offsetHeight / 2)
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
        console.log(e.clientY)
        // Inserting the dragging item before the found sibling
        tBody.insertBefore(draggingItem, nextSibling);
    }
    tBody.addEventListener("dragover", initSortableList);
    tBody.addEventListener("dragenter", e => e.preventDefault());
}


// new Sortable(document.querySelector('#todo-list tbody'), {
//     group: 'shared', // set both lists to same group
//     animation: 150,
//     onEnd:function(e){
//         const newList = document.querySelectorAll('#todo-list tbody tr');
//         const newArrangdList = [];
//         newList.forEach(function(el){
//             newArrangdList.push(JSON.parse(el.getAttribute('data-value')))
//         })

//         setLocalStorageData(newArrangdList);
//     }
// });