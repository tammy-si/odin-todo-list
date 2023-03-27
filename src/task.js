export default class Task {
    constructor(name, parent) {
        this.name = name;
        this.dueDate = "";
        this.parentProject = parent;
    }
}