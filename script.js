document.addEventListener('DOMContentLoaded', function(){
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function for Adding Task
  function addTask(){
    // Retreiving text value and triming
    let taskText = taskInput.value.trim();


    if (taskText === ''){
      alert('Kindly enter a task');
    }else{
      // Creating new list element and assigning it to the Input
      let li = document.createElement('li');
      li.textContent = taskText;

      // Creating a new button that deletes or removes the task created
      let button = document.createElement('button');
      button.textContent = "Remove";
      button.className = 'remove-btn';
      
      // Adding functionality to the button
      button.onclick = function(){
        taskList.removeChild(li);
      }


      li.appendChild(button);
      taskList.appendChild(li);

      // Clearing the input after adding a tasking
      taskInput.value = "";
    }
  }

  // Adding click event to add button to add task
  addButton.addEventListener('click', addTask);

  // Adding functionality to the Enter Key on my keyboard
  taskInput.addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
      addTask();
    }
  });
});
