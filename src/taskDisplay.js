import Projects from "./projects.js";
import Project from "./project.js"

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
        console.log(curr_location);
        // get the project based off of that location and display all the tasks
        if (curr_location == "Today") {
            var project = Projects.getTodayProjects();
        } else if (curr_location == "This-week") {
            console.log("This week")
            var project = Projects.find(curr_location);
        } else {
            var project = Projects.find(curr_location);
        }
        // now loop through all the tasks of the project and make some task button
        project.tasks.forEach(task => this.addATask(task.name, getLocation));
    }

    static addATask(taskName, getLocation) {
        let newTaskButton = document.createElement("button");
        newTaskButton.classList.add("task-button")
        let buttonText = document.createElement("p");
        buttonText.textContent = taskName;
        newTaskButton.appendChild(buttonText);
        projectTaskList.appendChild(newTaskButton);

        // making to check box so that user can check off a todo and delete it
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // make the deleteButton have dele functionality
        checkbox.addEventListener("click", (e) => {
            let parent = e.target.parentNode;
            // get the task name from the p tag 
            let taskName = parent.querySelector('p').textContent;
            // delete from local storage, by calling the class method for Task in project
            Project.deleteTask(taskName, getLocation());
            // then delete from DOM
            parent.remove();
        });
        newTaskButton.appendChild(checkbox);

        // making the date input
        let dateInput = document.createElement("input")
        dateInput.type = "date";
        dateInput.value = Project.getDueDate(taskName, getLocation());

        dateInput.addEventListener("change", (e) => {
            let parent = e.target.parentNode;
            // get the task name from the p tag 
            let taskName = parent.querySelector('p').textContent;
            // update the project's due date
            let newDate = dateInput.value;
            Project.updateDueDate(taskName, getLocation(), newDate);
        })
        newTaskButton.appendChild(dateInput);
    }

}