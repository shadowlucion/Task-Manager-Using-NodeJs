const formDOM = document.querySelector('.task-form');
const taskInput = document.querySelector('.task-input');
const formAlert = document.querySelector('.form-alert');
const loadingText = document.querySelector('.loading-text');
const taskDOM = document.querySelector('.tasks');


// Loading All tasks that are present in database
const showTask = async ()=>{
    loadingText.style.visibility = 'visible';
    try{
        const {data:{data:tasks}} =  await axios.get('/api/v1/tasks');
        if(tasks.length<1){
            taskDOM.innerHTML = `<h5 class="empty-list">No tasks in your list</h5>`;
            loadingText.style.visibility = 'hidden';
            return
        }
        
        const allTasks = tasks.map((task)=>{
            const {completed,_id:taskID,name} = task;

            return `<div class="single-task ${completed && 'task-completed'}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
            
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>

            <!-- delete button -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div>
            `
        }).join('');


        taskDOM.innerHTML = allTasks;

        

    }catch(error){
        taskDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'; 
    }
    loadingText.style.visibility = 'hidden';
}

showTask();


// delete task /api/v1/tasks/:id 

taskDOM.addEventListener('click',async (e)=>{
    el = e.target;
    
    if(el.parentElement.classList.contains('delete-btn')){
        loadingText.style.visibility = 'visible';
        const id = el.parentElement.dataset.id
        try{
            await axios.delete(`/api/v1/tasks/${id}`);
            showTask();
        }catch(error){
            console.log(error);
        }
    }
    
})


// form On submit Create Task
formDOM.addEventListener('submit',async (e)=>{ 
    e.preventDefault();
    const name = taskInput.value;

    try{
        await axios.post(`/api/v1/tasks`,{name})
        showTask();
        taskInput.value = '';
        formAlert.style.display = 'block';
        formAlert.textContent = `Success, task added`;
        formAlert.classList.add('text-success');
    }catch(error){
        formAlert.style.display = 'block';
        formAlert.innerHTML = `error, please try again `
    }
    setTimeout(()=>{
        formAlert.style.display = 'none';
        formAlert.classList.remove('text-success');
    },3000);

});