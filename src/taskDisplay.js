import Projects from "./projects";
const projectArea = document.querySelector(".project-area");
const projectTitle = document.querySelector(".project-title");
const projectTaskList = document.querySelector(".task-list");

export default class TaskDisplay {
    static displayTasks(getLocation) {
        // make sure we clear the old tasks before by display all of the new ones
        projectTaskList.innerHTML = "";
        // get the current project with getLocation
        let curr_location = getLocation();
        // changing the title
        projectTitle.textContent = curr_location;
        // get the project based off of that location and display all the tasks
        let project = Projects.find(curr_location);
        // now loop through all the tasks of the project and make some task button
        project.tasks.forEach(task => this.addATask(task.name));
    }

    static addATask(taskName) {
        let newTaskButton = document.createElement("button");
        newTaskButton.classList.add("project-button")
        let buttonText = document.createElement("p");
        buttonText.textContent = taskName;
        newTaskButton.appendChild(buttonText);
        projectTaskList.appendChild(newTaskButton);
    }

}