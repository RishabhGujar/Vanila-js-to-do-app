const container = document.querySelector("#mainContainer");
const form = document.querySelector("#form");
const input =document.querySelector("#task");


function handleSubmit(e){
  e.preventDefault();
  if(input.value){
     addTodo(input.value,input.value,false);
     saveTask(input.value,input.value,false);
  }
  input.value=""
}


function addTodo(name,id,checked){
   const div = document.createElement('div');
   const p = document.createElement('p');
   const button = document.createElement('button');
   const checkBox = document.createElement('input');
   
   
   checkBox.type = "checkbox";
   checkBox.name = "checkbox";
   checkBox.checked = checked;
   checkBox.className = "checkbox-style"

   p.textContent = name;

   button.innerText ="delete";
   button.className = "btn btn-1"
   
   div.className = "task-container";
   div.appendChild(p);
   div.appendChild(checkBox);
   div.appendChild(button);

   
   
   container.appendChild(div);

   getCheckbox(checkBox,id);
   handleDelete(div,button,id)
  
}

form.addEventListener("submit",handleSubmit);


function getCheckbox(checkBox,id){
    checkBox.addEventListener('click',()=>{
      console.log("get click")
      let value = checkBox.checked;
      onClickCheckboxSave(id,value);
    })
}

function handleDelete(div,button,id){
   button.addEventListener("click",()=>{
      div.className = "task-container delete"
      handleDeleteStorage(id)

   })
   div.addEventListener("transitionend",()=>{
     console.log("hi")
     div.remove();
   })
}

function handleDeleteStorage(id){
  let arr = localStorage.getItem("to-do-task") ;
  arr = JSON.parse(arr);
  console.log("deletestorage");
  let newArr = arr.filter((e)=>e.id!==id);
  console.log(newArr);
  localStorage.setItem("to-do-task",JSON.stringify(newArr));

}

function onClickCheckboxSave(id,value){
   let arr = localStorage.getItem("to-do-task") ;
   arr = JSON.parse(arr);
   let newArr = arr.map((e =>{ 
     if(e.id===id){
       e.checked = value;
       return e;
     }
     return e;
  
   }))

   localStorage.setItem('to-do-task',JSON.stringify(newArr));
  
}


function saveTask(name,id,checked){
   let obj = {name : name , id:id,checked:checked};
   let arr = localStorage.getItem("to-do-task");
   if(arr){
     arr = JSON.parse(arr);
     arr.push(obj);
     localStorage.setItem("to-do-task",JSON.stringify(arr));
   }
   else{
    localStorage.setItem("to-do-task",JSON.stringify([obj]));
   }

   
}

function loadTask(){
  let arr = localStorage.getItem("to-do-task");
  if(arr){
    arr = JSON.parse(arr);
    for(let task of arr){
      addTodo(task.name,task.id,task.checked)
    }
  }
}

loadTask();