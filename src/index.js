import './style.css';
import ProjectsDisplay from './projectsDisplay';
import Projects from "./projects.js";

const projectArea = document.querySelector(".project-area");
const projectTitle = document.querySelector('.project-title');
const taskList = document.querySelector('.task-list');

// on the window load, make sure to load the projects on the sidebar
ProjectsDisplay.loadProjects();

document.querySelector("#inboxButton").addEventListener("click", () => {
    projectTitle.textContent = "Inbox";
});

document.querySelector("#todayButton").addEventListener("click", () => {
    projectTitle.textContent = "Today";
});

document.querySelector("#weekButton").addEventListener("click", () => {
    projectTitle.textContent = "This week";
});


/ * section for the add projects */
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