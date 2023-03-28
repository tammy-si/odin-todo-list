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
        project.tasks.forEach(task => this.addATask(task.name, getLocation, task));
    }

    // task is an optional parameter for when we have to display tasks, not add.
    // when displaying existing tasks we have to pass in the actual task object
    static addATask(taskName, getLocation, task = null) {
        let newTaskButton = document.createElement("button");
        newTaskButton.classList.add("task-button")
        let buttonText = document.createElement("p");
        buttonText.textContent = taskName;
        buttonText.classList.add("task-name")
        newTaskButton.appendChild(buttonText);
        projectTaskList.appendChild(newTaskButton);

        // making to check box so that user can check off a todo and delete it
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // show the parent project
        if (getLocation() == "Today" || getLocation == "This-week") {
            var parentText = document.createElement("p");
            parentText.textContent = `(${task.parentProject})`;
            parentText.classList.add("parent-project")
            newTaskButton.appendChild(parentText)
        }

        // make the deleteButton have dele functionality
        checkbox.addEventListener("click", (e) => {
            let parent = e.target.parentNode;
            // get the task name from the p tag 
            let taskName = parent.querySelector('.task-name').textContent;
            // if the user is currently on the today or this week tab delete the task from the tasks' parent project
            if (getLocation() == "Today" || getLocation == "This-week") {
                // get the parent project
                let parentText = parent.querySelector(".parent-project").textContent;
                parentText = parentText.substring(1, parentText.length-1);
                // delete the task from local storage from the parentProject
                Project.deleteTask(taskName, parentText);
            } else {
                // delete from local storage, by calling the class method for Task in project
                Project.deleteTask(taskName, getLocation());
            }
            // then delete from DOM
            parent.remove();
        });
        newTaskButton.appendChild(checkbox);

        // making the date input
        let dateInput = document.createElement("input")
        dateInput.type = "date";
        // get from the parent Project instead if it's today or this week to find the task's due date
        if (getLocation() == "Today" || getLocation == "This-week") {
            dateInput.value = Project.getDueDate(taskName, task.parentProject);
        } else {
            // instead look for the task in whatever project we're in
            dateInput.value = Project.getDueDate(taskName, getLocation());
        }

        dateInput.addEventListener("change", (e) => {
            let parent = e.target.parentNode;
            // get the task name from the p tag 
            let taskName = parent.querySelector('.task-name').textContent;
            // update the project's due date
            let newDate = dateInput.value;
            // if the user is currently on the today or this week tab delete the task from the tasks' parent project
            if (getLocation() == "Today" || getLocation == "This-week") {
                // get the parent project
                let parentText = parent.querySelector(".parent-project").textContent;
                parentText = parentText.substring(1, parentText.length-1);
                // delete the task from local storage from the parentProject
                Project.updateDueDate(taskName, parentText, newDate);
                // re dislpay the tasks, so that the date was changed out of range, it fixes it
                this.displayTasks(getLocation);
            } else {
                Project.updateDueDate(taskName, getLocation(), newDate);
            }
        })
        newTaskButton.appendChild(dateInput);
    }

}