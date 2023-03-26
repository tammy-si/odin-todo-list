import Project from "./project.js";

// a class to handle changes to the allProjects localStorages
export default class Projects {

    // returns an array of all the projects objects in local Storage
    static getProjects() {
        return JSON.parse(localStorage.getItem("allProjects") || "[]");
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
}