import Project from "./project.js";

// a class to handle changes to the allProjects localStorages
export default class Projects {

    // returns an array of all the projects objects in local Storage
    static getProjects() {
        return JSON.parse(localStorage.getItem("allProjects") || JSON.stringify([new Project("Inbox")]));
    }

    // adding a project called name to the localStorage
    static add(name) {
        // get current projects array  
        let allProjects = this.getProjects();
        // make a new project and put it into the array
        let newProj = new Project(name);
        allProjects.push(newProj);    
        // now store the new array in localStorage
        localStorage.setItem("allProjects", JSON.stringify(allProjects));
    }

    // deleting a project called projectName to the localStorage
    static delete(projectName) {
        // delete from local storage
        let allProjects = this.getProjects();
        let newAllProjects = allProjects.filter(project => project.name != projectName)
        localStorage.setItem("allProjects", JSON.stringify(newAllProjects));
    }

    static find(projectName) {
        let allProjects = this.getProjects();
        return allProjects.find(project => project.name == projectName);
    }

    static getTodayProjects() {
        // first get all of the projects
        let allProjects = this.getProjects();
        console.log(allProjects) 
        // get today's date
        let today = new Date().toISOString().slice(0, 10);
        // find tasks that match up with todays' dates
        let todayProjects = []
        // look thorugh all projects and the tasks for each
        for (let i = 0; i < allProjects.length; i++) {
            for (let j = 0; j < allProjects[i].tasks.length; j++) {
                if (allProjects[i].tasks[j].dueDate == today) {
                    todayProjects.push(allProjects[i].tasks[j]);
                }
            }
        }
        // return a project with tasks set to the tasks we just found
        let dummy = new Project();
        dummy.tasks = todayProjects;
        return dummy;
    }
}