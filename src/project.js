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
}


