// all section

const search = document.getElementById('search-input'); 
const todo = document.getElementById('todo-input'); 
const addTodo = document.getElementById('add-todo'); 
const todoList = document.getElementById('todo-list'); 



/// todo array
const array = [{id: '01', todo: 'Task 1', endDate: '01/05/22', startDate: '05/03/23'}]


// set todo with click 
addTodo.addEventListener('click', ()=>{
    showTodo()
})






// show todo into dom

function showTodo(){
    console.log('show todo')
}