import { completedLibrary, projectArrays, todayLibrary, tomorrowLibrary  } from "./index.js";
import Delete from "./delete.png";
import { homeLibrary } from "./index.js";

export default function completedList() {
    const todoContent = document.querySelector(".todo-content");
    const h3 = document.createElement("h3");
    h3.innerText = "Completed List";
    todoContent.appendChild(h3);
    completedLibrary.forEach(item => {
        const homeEl = document.createElement("div");
const todoBox = document.createElement("div");
todoBox.classList.add("todo-box");
homeEl.classList.add("todo-text");
const todoContent = document.querySelector(".todo-content");
    console.log(item.title);
   
    homeEl.innerHTML = `<h3> Title: ${item.title} </h3> <h4> Priority: ${item.priority} </h4>  <h5> Date:${item.date} </h5>  <h6> Description: ${item.description} </h6> <h2>${item.project}` ;
   const imageDiv = document.createElement("div");
   const imgDelete = new Image();
   const deleteBtn = document.createElement("button");
   deleteBtn.classList.add("delete-btn");
   const checkbox = document.createElement("input");
   checkbox.type = "checkbox";
   checkbox.checked = true;
   checkbox.classList.add("check-complete");

   const label = document.createElement("label");
   label.textContent = "Completed?::";
   label.classList.add("check-label");
   checkbox.checked = item.isChecked || false;
   
   imgDelete.src = Delete;
  
   deleteBtn.appendChild(imgDelete);
   imageDiv.appendChild(label);
   imageDiv.appendChild(checkbox);
  imageDiv.appendChild(deleteBtn);
  todoBox.appendChild(homeEl);
  todoBox.appendChild(imageDiv);
    todoContent.appendChild(todoBox);

    deleteBtn.addEventListener("click", () => {
        const index = completedLibrary.indexOf(item);
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
                
                completedLibrary.splice(index, 1);
                if(todayLibrary.includes(item)){
                    const todayIndex = todayLibrary.indexOf(item);
                    todayLibrary.splice(todayIndex, 1);
                    }
                    if(tomorrowLibrary.includes(item)){
                        const tomorrowIndex = todayLibrary.indexOf(item);
                        tomorrowLibrary.splice(tomorrowIndex, 1);
                        }
          todoContent.removeChild(todoBox);
        }
    });
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