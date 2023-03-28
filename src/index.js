import './style.css';
import ProjectsDisplay from './projectsDisplay';
import Projects from "./projects.js";
import Task from "./task.js";
import Project from "./project.js";
import TaskDisplay from './taskDisplay';

const projectArea = document.querySelector(".project-area");
const projectTitle = document.querySelector('.project-title');
const taskList = document.querySelector('.task-list');

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
        getLocation,
        changeLocation
    }
})();

// on the window load, make sure to load the projects on the sidebar
ProjectsDisplay.loadProjects(globals.changeLocation, globals.getLocation);
// display the inbox tasks onload
TaskDisplay.displayTasks(globals.getLocation);

document.querySelector("#inboxButton").addEventListener("click", () => {
    projectTitle.textContent = "Inbox";
    globals.changeLocation("Inbox");
    TaskDisplay.displayTasks(globals.getLocation);
    document.querySelector(".addTaskButton").classList.remove("clicked");
});

document.querySelector("#todayButton").addEventListener("click", () => {
    projectTitle.textContent = "Today";
    globals.changeLocation("Today");
    TaskDisplay.displayTasks(globals.getLocation);
    document.querySelector(".addTaskButton").classList.add("clicked");
});

document.querySelector("#weekButton").addEventListener("click", () => {
    projectTitle.textContent = "This week";
    globals.changeLocation("This-week");
    TaskDisplay.displayTasks(globals.getLocation);
    document.querySelector(".addTaskButton").classList.add("clicked");
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
    // make sure that the project name doesn't alrady exist, if it does, give an alert error
    if (Projects.find(newName)) {
        alert("Error. That project already exists.")
        return;
    } else if (newName.length == 0){
        alert("Error. No empty names allowed.")
        return;
    }
    // make a new project and put it into the array
    Projects.add(newName);
    // also make sure to add to display, pass in a way to keep track of what project we're on
    ProjectsDisplay.addAProj(newName, globals.changeLocation, globals.getLocation);

    // here we clear the input box for projects
    document.querySelector(".projectNameInput").value = "";
    // hide the form and show the button
    addProjectButton.classList.toggle("clicked");
    addProjectForm.classList.toggle("show");
})

cancel.addEventListener("click", () => {
    // here we clear the input box for projects
    document.querySelector(".projectNameInput").value = "";
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
    // display the form
    addTaskButton.classList.toggle("clicked");
    addTaskForm.classList.toggle("show");
})

// handling the addTask form  add
addTask.addEventListener("click", () => {
    let newTaskName = document.querySelector(".taskNameInput").value;
    // make sure the project we're in doesn't already have a task with this name
    if (Project.taskInProject(newTaskName, globals.getLocation())) {
        alert("Error. No tasks with same name in one project allowed.")
        return;
    } else if (newTaskName.length == 0){
        alert("Error. No empty task name allowed.")
        return;
    }
    Project.addTask(newTaskName, globals.getLocation());
    // add the task with display
    TaskDisplay.addATask(newTaskName, globals.getLocation);

    // here we clear the input box
    document.querySelector(".taskNameInput").value = "";
    // hide the form and show the button
    addTaskButton.classList.toggle("clicked");
    addTaskForm.classList.toggle("show");
})

cancelTask.addEventListener("click", () => {
    // here we clear the input box for task
    document.querySelector(".taskNameInput").value = "";
    // hide the form and show the button
    addTaskButton.classList.toggle("clicked");
    addTaskForm.classList.toggle("show");
})
