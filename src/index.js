import Home from './home.png';
import Menu from './menu.png';
import Today from './today.png';
import Tomorrow from './tomorrow.png';
import Complete from './complete.png';
import Add from './add.png';
import homeFunction from './home.js';
import todayFunction from './today.js';
import tomorrowFunction from './tomorrow.js';
import completedList from './complete.js';
import './style.css';
import { format } from 'date-fns';
import { addDays } from 'date-fns';
import projectList from './project.js';

function loadFromLocalStorage() {
    const storedHomeLibrary = localStorage.getItem('homeLibrary');
    const storedtodayLibrary = localStorage.getItem('todoLibrary');
    const storedtomorrowLibrary = localStorage.getItem('tomorrowLibrary');
    const storedCompletedLibrary = localStorage.getItem('completedLibrary');
    if (storedHomeLibrary || storedtodayLibrary || storedtomorrowLibrary || storedCompletedLibrary) {
        const storedHomeItems = JSON.parse(storedHomeLibrary);
        const storedtodayItems = JSON.parse(storedtodayLibrary);
        const storedtomorrowItems = JSON.parse(storedtomorrowLibrary);
        const storedcompletedItems = JSON.parse(storedCompletedLibrary);
        homeLibrary = homeLibrary.concat(storedHomeItems);
        todayLibrary = todayLibrary.concat(storedtodayItems);
        tomorrowLibrary = tomorrowLibrary.concat(storedtomorrowItems);
        completedLibrary = completedLibrary.concat(storedcompletedItems);

            if(storedHomeLibrary){
                homeFunction();
            }
        
       if(storedCompletedLibrary){
        completedList();
       }
       else if(storedtodayLibrary){
        todayFunction();
       }
       else if(storedtomorrowLibrary){
        tomorrowFunction();
       }
    }
}



let homeLibrary = [];
let todayLibrary = [];
let tomorrowLibrary = [];
let completedLibrary = [];
 const currentDate = new Date();
 const formattedDate = format(currentDate, 'yyyy-MM-dd');
 console.log(formattedDate);
 const tomorrowDate = addDays(currentDate, 1);
 const formattedTomorrowDate = format(tomorrowDate, 'yyyy-MM-dd');
console.log(formattedTomorrowDate);


const closeBtn = document.querySelector("#close");
const submitBtn = document.querySelector("#submit-btn");
const form = document.querySelector("#my-form");
const title = document.querySelector("#title");

const priority = document.querySelector("#priority");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const projectBtn = document.getElementById("project-button");
const project = document.getElementById("projectname");
const projectItem = document.getElementById("projectItem");
const dialogProject = document.getElementById("dialog-project");
const menus = document.querySelector(".menus");
const ok = document.querySelector(".ok");
const homeBtn = document.querySelector("#home");
const todayBtn = document.querySelector("#today");
const tomorrowBtn = document.querySelector("#tomorrow");
const completedBtn = document.querySelector("#completed");
const checkComplete = document.querySelector(".check-complete");

document.getElementById('home-image').src = `${Home}`;
document.getElementById('menu-image').src = `${Menu}`;
document.getElementById('tomorrow-image').src = `${Tomorrow}`;
document.getElementById('today-image').src = `${Today}`;
document.getElementById('completed-image').src = `${Complete}`;
document.getElementById('add-image').src = `${Add}`;



function saveToLocalStorage() {
    localStorage.setItem('homeLibrary', JSON.stringify(homeLibrary));
    localStorage.setItem('todayLibrary', JSON.stringify(todayLibrary));
    localStorage.setItem('tomorrowLibrary', JSON.stringify(tomorrowLibrary));
    localStorage.setItem('completedLibrary', JSON.stringify(completedLibrary));
   }



    function clickedMenu() {
        const menu = document.querySelector(".menu-button");
        const menus = document.querySelector(".menus");
        menu.addEventListener("click", function() {
            menus.style.display = (menus.style.display === "none" || menus.style.display === "") ? "block" : "none";
        });
    }

    clickedMenu();

    const dialog = document.querySelector(".dial");
    const addBtn = document.querySelector("#add-btn");

    addBtn.addEventListener("click", () => {
        dialog.showModal();
    })

    closeBtn.addEventListener("click", () => {
        dialog.close();
        title.value = "";
        date.value = "";
        description.value = "";
    })
    
    const projectArrays = {
        "Default Project": [],
     };
     const todoContent = document.querySelector(".todo-content");
  
   
 


     homeBtn.addEventListener("click", () => {
        todoContent.innerHTML = "";
       
        homeFunction();
    });
    


    todayBtn.addEventListener("click", () => {
        todoContent.innerHTML = "";

        todayFunction();
    });
    
    tomorrowBtn.addEventListener("click", () => {
        todoContent.innerHTML = "";
     
        tomorrowFunction();
    });

     completedBtn.addEventListener("click", () => {
        todoContent.innerHTML = "";
       
        completedList();
     });
     
//    loadFromLocalStorage();
    submitBtn.addEventListener("click", (event) => {
        
        event.preventDefault();
            if(!form.elements.project.value){
                project.value = "Default Project";
                console.log(project.value);
            }
            else{
                project.value = form.elements.project.value;
            }
            const todoItems = {

                title: form.elements.title.value,
                priority: form.elements.priority.value,
                date: form.elements.date.value,
        
                description: form.elements.description.value,
                project: project.value,
            }
            if (!todoItems.title || !todoItems.date || !todoItems.priority || !todoItems.description) {
                // Display an alert or handle the case when required details are not filled
                alert("Please fill in all required details.");
                event.preventDefault(); // Prevent the default form submission behavior
                return;
            }
            homeLibrary.push(todoItems);

            homeFunction();
          
             
               
           
            if(formattedDate===todoItems.date){
                todayLibrary.push(todoItems);
            }
            else if(formattedTomorrowDate===todoItems.date){
                tomorrowLibrary.push(todoItems);
            }
           
            saveToLocalStorage();
            

        
            if(todoItems.project){
                projectArrays[todoItems.project].push(todoItems);
                console.log("yes");
            }
            else{{
                projectArrays["Default Project"].push(todoItems);
            }}
           console.log(projectArrays[todoItems.project]);
           console.log("sushen");
            dialog.close();
            title.value = "";
            priority.value = "";
            date.value = "";
            description.value = "";
            project.value = "";

    });
   
 

    projectBtn.addEventListener("click", (event) => {
        event.preventDefault();
    
        console.log("Button Clicked");
        const projectValue = project.value.trim() + " Project";
        
        // Check if the project already exists in the projectArrays
        if (!projectArrays[projectValue]) {
            projectArrays[projectValue] = []; // Create a new array for the project if it doesn't exist
        }
    
        if (project.value !== "") {
            const option = document.createElement("option");
            option.value = projectValue;
            option.text = projectValue;
    
            // Create a new array with the project name as the key if it doesn't exist
            const clonedOption = option.cloneNode(true);
            projectItem.appendChild(option);
            dialogProject.appendChild(clonedOption);
    
            project.value = "";
            console.log(projectArrays[projectValue]);
            console.log(projectArrays);
        }
    });
   
    ok.addEventListener("click", (event) => {
        event.preventDefault();
        const projectItemValue = projectItem.value;
        console.log(projectArrays[projectItemValue]);
        console.log(projectItemValue);
        projectList(projectItemValue);

})





export { homeLibrary };
export { todayLibrary };
export { tomorrowLibrary };
export { completedLibrary };
export { projectArrays };






