const mainDiv = document.getElementById('container');
const TodoTitle = document.getElementById('title');

const AllTodos = document.getElementById('allTodos');
const TodoBtn = document.getElementById('addBtn');

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const filteringBtn=document.getElementById('filterBtn')
const sortingBtn=document.getElementById('sortBtn')

let current_page = 1;
let todos_per_page = 3;

function DisplayTodo(todos) {
    AllTodos.innerHTML = "";

    todos.forEach((todo, idx) => {
        const TodoDiv = document.createElement('div');
        TodoDiv.className=('todo-card');
        
        const Title = document.createElement('h3');
        const Status = document.createElement('p');

        Title.textContent = `Task ${idx + 1} : ${todo.title}`;
        Status.textContent = `Status : ${todo.status}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');

        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Edit';
        updateBtn.classList.add('edit-btn');

        deleteBtn.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        updateBtn.addEventListener('click', () => {
            updateTodo(todo.id);
        });

        TodoDiv.append(Title, Status, updateBtn, deleteBtn);
        AllTodos.append(TodoDiv);
    });
}

async function filteredDatas(current_page) {
    try{
        const response = await fetch(`http://127.0.0.1:7777/api/todos/?page=${current_page}`);
        const data = await response.json();
        console.log(data);
        
        const filteredData=data.results.filter(el => el.status==false)
        console.log(filteredData);
        
        DisplayTodo(filteredData)
    
    }catch (error){
        console.log('Something Went Wrong in Filtering',error);
    }
}

filteringBtn.addEventListener('click',()=>{
    filteredDatas(current_page);
})

let sortOrder='asc';

async function sortingDatas(current_page) {

   const sortParameters=sortOrder == 'asc' ? 'title' : '-title';
   sortOrder=(sortOrder==='asc') ? 'desc' : 'asc';

    try{
        const response = await fetch(`http://127.0.0.1:7777/api/todos/?ordering=${sortParameters}&page=${current_page}`);
        const data = await response.json();
        // console.log(data);
        DisplayTodo(data.results)
    
    }catch (error){
        console.log('Something Went Wrong in sorting',error);
    }
}

sortingBtn.addEventListener('click',()=>{
    sortingDatas(current_page);
})


async function deleteTodo(todos_id) {
    try {
        const response = await fetch(`http://127.0.0.1:7777/api/todos/${todos_id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json"
            }
        });

        const data = await response.json();
        FetchTodo(current_page);

    } catch (error) {
        console.log("Something went wrong in deleteTodo function", error);
    }
}

async function updateTodo(todos_id) {
    const NewTitle = prompt('Please enter your new title');
    let Status=prompt("Enter status of task (true/false)");
    Status=Boolean(Status)

    try {
        const response = await fetch(`http://127.0.0.1:7777/api/todos/${todos_id}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'title': NewTitle,
                'status':Status,
            }),
        });

        const data = await response.json();
        FetchTodo(current_page);

    } catch (error) {
        console.log("Something went wrong in updateTodo function", error);
    }
}

async function AddTodo() {
    const TodoTitleValue = TodoTitle.value;
   

    try {
        const response = await fetch(`http://127.0.0.1:7777/api/todos/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": TodoTitleValue,
                
            })
        });

        const data = await response.json();
        FetchTodo(current_page);

    } catch (error) {
        console.log("Something went wrong in AddTodo function", error);
    }
}

TodoBtn.addEventListener('click', AddTodo);

async function FetchTodo(current_page) {
    try {
        const response = await fetch(`http://127.0.0.1:7777/api/todos/?page=${current_page}`);
        const data = await response.json();
        DisplayTodo(data.results);

    } catch (error) {
        console.log("Something went wrong in FetchTodo function", error);
    }
}

prevBtn.addEventListener('click', () => {
    if (current_page > 1) {
        current_page--;
        FetchTodo(current_page);
    }
});

nextBtn.addEventListener('click', () => {
    current_page++;
    FetchTodo(current_page);
});

FetchTodo(current_page);
