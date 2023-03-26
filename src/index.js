import './style.css';
import ProjectsDisplay from './projectsDisplay';
import Projects from "./projects.js";

const projectArea = document.querySelector(".project-area");
const projectTitle = document.querySelector('.project-title');
const taskList = document.querySelector('.task-list');

// on the window load, make sure to load the projects on the sidebar
ProjectsDisplay.loadProjects();

// making a object for global variables so we don't expose the global variables
var globals = (function () {
    let curr_location = "Inbox";
    // gets what tab user is currently on
    function getLocation(){
        return curr_location;
    }
    // changes the curr_location
    function changeLocation(new_location){
        curr_location = new_location;
    }

    return {
        getLocation: getLocation,
        changeLocation: changeLocation
    }
})();

document.querySelector("#inboxButton").addEventListener("click", () => {
    projectTitle.textContent = "Inbox";
});

document.querySelector("#todayButton").addEventListener("click", () => {
    projectTitle.textContent = "Today";
});

document.querySelector("#weekButton").addEventListener("click", () => {
    projectTitle.textContent = "This week";
});


/* section for the add projects */
const addProjectButton = document.querySelector(".addProjectButton");
const addProjectForm = document.querySelector(".addProjectForm");
const add = document.querySelector(".addButton");
const cancel = document.querySelector(".cancelButton");

// add Project button 
addProjectButton.addEventListener('click', () => {
    // display the form
    addProjectButton.classList.toggle("clicked");
    addProjectForm.classList.toggle("show");
})

// handling the addProject form  add
add.addEventListener("click", () => {
    let newName = document.querySelector(".projectNameInput").value;
    // make a new project and put it into the array
    Projects.add(newName);
    // also make sure to add to display
    ProjectsDisplay.addAProj(newName);
    // hide the form and show the button
    addProjectButton.classList.toggle("clicked");
    addProjectForm.classList.toggle("show");
})

cancel.addEventListener("click", () => {
    // hide the form and show the button
    addProjectButton.classList.toggle("clicked");
    addProjectForm.classList.toggle("show");
})


/* section for the add tasks */
const addTaskButton = document.querySelector(".addTaskButton");
const addTaskForm = document.querySelector(".addTaskForm");
const addTask = document.querySelector(".addTask");
const cancelTask = document.querySelector(".cancelTask");


// add task button 
addTaskButton.addEventListener('click', () => {
    console.log(addTaskButton)
    // display the form
    addTaskButton.classList.toggle("clicked");
    addTaskForm.classList.toggle("show");
})

// handling the addProject form  add
addTask.addEventListener("click", () => {
    let newTaskName = document.querySelector(".taskNameInput").value;
    // hide the form and show the button
    addTaskButton.classList.toggle("clicked");
    addTaskForm.classList.toggle("show");
})

cancelTask.addEventListener("click", () => {
    // hide the form and show the button
    addTaskButton.classList.toggle("clicked");
    addTaskForm.classList.toggle("show");
})
