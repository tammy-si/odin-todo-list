// module to handle displaying all the projects on the sidebar
const projectsSide = document.querySelector(".projects");
const projectAddButton = document.querySelector('.addProjectButton')

// this one runs when the user loads in or refreshs
const loadProjects = () => {
    // get all the projects from localStorage as an array
    let allProjects = JSON.parse(localStorage.getItem("allProjects") || "[]");
    // for each of the projects, make a new DOM button and add event listeners for those dom buttons
    allProjects.forEach(project => addAProj(project))
}

const addAProj = (project) => {
    // making the new project button
    let newProjectButton = document.createElement("button");
    newProjectButton.classList.add("project-button")
    let buttonText = document.createElement("p");
    buttonText.textContent = project.name;
    newProjectButton.appendChild(buttonText);
    // making the delete part
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    newProjectButton.appendChild(deleteButton);
    // putting the project right before the add project button
    projectsSide.insertBefore(newProjectButton, projectAddButton);
}

export { loadProjects, addAProj }