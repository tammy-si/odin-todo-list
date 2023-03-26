// class to handle displaying all the projects on the sidebar
const projectsSide = document.querySelector(".projects");
const projectAddButton = document.querySelector('.addProjectButton')

export default class ProjectsDisplay {
    // this one runs when the user loads in or refreshs
    static loadProjects() {
        // get all the projects from localStorage as an array
        let allProjects = JSON.parse(localStorage.getItem("allProjects") || "[]");
        // for each of the projects, make a new DOM button and add event listeners for those dom buttons
        allProjects.forEach(project => this.addAProj(project))
    }

    static addAProj (project) {
        // making the new project button
        let newProjectButton = document.createElement("button");
        newProjectButton.classList.add("project-button")
        let buttonText = document.createElement("p");
        buttonText.textContent = project.name;
        newProjectButton.appendChild(buttonText);
        // making the delete part
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        // make the deleteButton have dele functionality
        deleteButton.addEventListener("click", (e) => {
            let parent = e.target.parentNode;
            // get the project name from the p tag 
            let projectName = parent.querySelector('p').textContent;
            // delete from local storage
            let allProjects = JSON.parse(localStorage.getItem("allProjects") || "[]");
            let newAllProjects = allProjects.filter(project => project.name != projectName)
            localStorage.setItem("allProjects", JSON.stringify(newAllProjects));
            // then delete from DOM
            parent.remove();
        });
        newProjectButton.appendChild(deleteButton);
        // putting the project right before the add project button
        projectsSide.insertBefore(newProjectButton, projectAddButton);
    }
}