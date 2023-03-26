import Projects from "./projects.js";
import TaskDisplay from "./taskDisplay.js";

// class to handle displaying all the projects on the sidebar
const projectsSide = document.querySelector(".projects");
const projectAddButton = document.querySelector('.addProjectButton');


export default class ProjectsDisplay {
    // this one runs when the user loads in or refreshs
    static loadProjects() {
        // get all the projects from localStorage as an array
        let allProjects = Projects.getProjects();
        // for each of the projects, make a new DOM button and add event listeners for those dom buttons
        allProjects.forEach(project => this.addAProj(project.name))
    }

    // name is string, just the name of the project to be added
    // making the dom stuff for adding a new project
    static addAProj (name) {
        // making the new project button
        let newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project-button")
        let buttonText = document.createElement("p");
        buttonText.textContent = name;
        newProjectButton.appendChild(buttonText);
        // making the delete part
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X"; 

        // make the deleteButton have dele functionality
        deleteButton.addEventListener("click", (e) => {
            let parent = e.target.parentNode;
            // get the project name from the p tag 
            let projectName = parent.querySelector('p').textContent;
            // delete from local storage, by calling the class method for Projectss
            Projects.delete(projectName);
            // then delete from DOM
            parent.remove();
        });
        newProjectButton.appendChild(deleteButton);

        // when the user actually clicks on the project button do something
        newProjectButton.addEventListener("click", (event) => {
            let parent = event.currentTarget;
            // get the project name from the p tag 
            let projectName = parent.querySelector('p').textContent;
            // find the project from Projects class in order to display
            let project = Projects.find(projectName);
            // display the project's task
            TaskDisplay.displayTasks(project)
        });

        // putting the project right before the add project button
        projectsSide.insertBefore(newProjectButton, projectAddButton);
    }
}