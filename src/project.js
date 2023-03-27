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
        console.log(allProjects, curr_location);
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
}


