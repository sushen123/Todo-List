import { tomorrowLibrary } from "./index.js";
import { completedLibrary } from "./index.js";
import { todayLibrary } from "./index.js";
import { homeLibrary } from "./index.js";
import { projectArrays } from "./index.js";

import Delete from "./delete.png";
 
let tomorrowNum = 0;
export default function tomorrowFunction() {
  const todoContent = document.querySelector(".todo-content");
  const h3 = document.createElement("h3");
  h3.innerText = "Tomorrow List";
  todoContent.appendChild(h3);
tomorrowLibrary.forEach((item) => {


const homeEl = document.createElement("div");
const todoBox = document.createElement("div");
todoBox.classList.add("todo-box");
homeEl.classList.add("todo-text");
const todoContent = document.querySelector(".todo-content");
   
   
    homeEl.innerHTML = `<h3> Title: ${item.title} </h3> <h4> Priority: ${item.priority} </h4>  <h5> Date:${item.date} </h5>  <h6> Description: ${item.description} </h6> <h2>${item.project}`
    tomorrowNum = tomorrowNum + 1;  
   const imageDiv = document.createElement("div");
   const imgDelete = new Image();
   const deleteBtn = document.createElement("button");
   deleteBtn.classList.add("delete-btn");
   const checkbox = document.createElement("input");
   checkbox.type = "checkbox";
   checkbox.classList.add("check-complete");

   const label = document.createElement("label");
   label.textContent = "Completed?::";
   label.classList.add("check-label");

   imgDelete.src = Delete;
   deleteBtn.appendChild(imgDelete);
   imageDiv.appendChild(label);
   imageDiv.appendChild(checkbox);
  imageDiv.appendChild(deleteBtn);
  todoBox.appendChild(homeEl);
  todoBox.appendChild(imageDiv);
    todoContent.appendChild(todoBox);
    checkbox.checked = item.isChecked || false;
    deleteBtn.addEventListener("click", () => {
      const index = tomorrowLibrary.indexOf(item);
      if (index !== -1) {
          if(homeLibrary.includes(item)){
              const homeIndex = homeLibrary.indexOf(item);
          homeLibrary.splice(homeIndex, 1);
          }

          const projectKey = Object.keys(projectArrays).find(key => projectArrays[key].includes(item));
              if(projectKey){
                  const projectIndex = projectArrays[projectKey].indexOf(item);
                  projectArrays[projectKey].splice(projectIndex, 1);
              }
              
              tomorrowLibrary.splice(index, 1);

              if(todayLibrary.includes(item)){
                  const todayIndex = todayLibrary.indexOf(item);
                  todayLibrary.splice(todayIndex, 1);
                  }
                  if(completedLibrary.includes(item)){
                      const completedIndex = completedLibrary.indexOf(item);
                      completedLibrary.splice(completedIndex, 1);
                      }
        todoContent.removeChild(todoBox);
      }
  });
    const checkboxComplete = document.querySelector(".check-complete");
    checkbox.addEventListener("change", () => {
        item.isChecked = checkbox.checked;
        if(checkbox.checked){
            completedLibrary.push(item);
            console.log(item.title);
            

        }
        else{
            const index = completedLibrary.indexOf(item);
        if (index !== -1) {
          completedLibrary.splice(index, 1);
        }
    }
    })
});

   

   
}

export { completedLibrary};