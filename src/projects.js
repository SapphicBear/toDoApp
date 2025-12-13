import { format } from "date-fns";
export class Project {
    constructor(name, color) {
        this.name = name;
        this.color = color;
    }
    creationDate = format(new Date(), "dd.MM.yyyy - kk:mm")
    delete = false;
    body = [];

    setDelete() {
        if (this.delete == true) {
            this.delete = false;
        } else {
            this.delete = true;
        }
    }

    addToDo(todo) {
        if (this.body.includes(todo)) {
            throw new Error("Already in array");
        } else {
            this.body.push(todo);
            console.log(`to-do: "${todo.title}" added to project: "${this.name}"`);
        }
    }

    removeToDo(todo) {
        if (!this.body.includes(todo)) {
            throw new Error("This ToDo does not exist in this project!");
        } else {
            const index = this.body.indexOf(todo);
            this.body.splice(index, 1);
        }
    }
}