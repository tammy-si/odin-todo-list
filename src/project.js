import Projects from "./projects.js"
import Task from "./task.js"

export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }   

    static addTask(newTaskName, curr_location) {
        // get all the current projects
        let allProjects = Projects.getProjects();
        // get the current we're on with current location
        let project = allProjects.find(project => project.name == curr_location);
        // add the task
        project.tasks.push(new Task(newTaskName, curr_location));
        // store new info into local storage
        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    static deleteTask(taskName, projectDeleteFrom) {
        // find the task by looking through all the projects.
        // once we find the parent project, look throught the parent project's tasks and change
        let allProjects = Projects.getProjects();
        for (let i = 0; i < allProjects.length; i++) {
            if (allProjects[i].name == projectDeleteFrom) {
                allProjects[i].tasks = allProjects[i].tasks.filter(task => task.name != taskName);
            }
        }
        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    static taskInProject(newTaskName, curr_location) {
        // get the project we're in and check if the task already exists
        let project = Projects.find(curr_location);
        for (let i = 0; i < project.tasks.length; i++) {
            if (project.tasks[i].name == newTaskName) {
                return true;
            }
        }
        return false;
    }

    static getDueDate(taskName, projectUpdateFrom) {
        let allProjects = Projects.getProjects();
        for (let i = 0; i < allProjects.length; i++) {
            if (allProjects[i].name == projectUpdateFrom) {
                // look through the project's tasks
                for (let j = 0; j < allProjects[i].tasks.length; j++) {
                    if (allProjects[i].tasks[j].name == taskName) {
                        return allProjects[i].tasks[j].dueDate;
                    }
                }
            }
        }
    }

    static updateDueDate(taskName, projectUpdateFrom, newDate) {
        let allProjects = Projects.getProjects();
        for (let i = 0; i < allProjects.length; i++) {
            if (allProjects[i].name == projectUpdateFrom) {
                // look through the project's tasks
                for (let j = 0; j < allProjects[i].tasks.length; j++) {
                    if (allProjects[i].tasks[j].name == taskName) {
                        allProjects[i].tasks[j].dueDate = newDate;
                    }
                }
            }
        }
        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }
}


