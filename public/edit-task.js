const taskFormDom = document.querySelector('.single-task-form');
const taskEditID = document.querySelector('.task-edit-id');
const taskEditName = document.querySelector('.task-edit-name');
const taskEditCompleted = document.querySelector('.task-edit-completed');
const taskEditBtn = document.querySelector('.task-edit-btn')
const formAlert = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName;


const showTask = async ()=>{
    try{
       const {data:{data:task}}=  await axios.get(`/api/v1/tasks/${id}`);
       const {_id:taskID,name,completed} = task;


       taskEditID.textContent = taskID;
       taskEditName.value = name;
       tempName = name;
       taskEditCompleted.checked = completed;

    }catch(error){
        console.log(error);
    }
  
}

showTask();


taskFormDom.addEventListener('submit',async (e)=>{
    taskEditBtn.textContent = 'Loading...';
    e.preventDefault();
    try{
        const taskName = taskEditName.value;
        const taskCompleted = taskEditCompleted.checked;

        console.log(taskName,taskCompleted);

        const {data:{task}} = await axios.patch(`/api/v1/tasks/${id}`,{
            name:taskName,
            completed:taskCompleted
        });


        const {_id:taskID,completed,name} = task;

        taskEditID.textContent = taskID;
        taskEditName.value = name;

        taskEditCompleted.checked = completed;

        formAlert.style.display = 'block';
        formAlert.textContent = `success, edited task`;
        formAlert.classList.add('text-success')

    }catch(error){
        console.log(error);
        taskEditName.value = tempName
        formAlert.style.display = 'block'
        formAlert.innerHTML = `error, please try again`
    } 

    
    taskEditBtn.textContent = 'Edit';
    setTimeout(() => {
        formAlert.style.display = 'none'
        formAlert.classList.remove('text-success')
      }, 3000);

})





