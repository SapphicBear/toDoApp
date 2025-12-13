import "./styles.css";
import { format } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
console.log("Javascript connected!");

const project1 = new Project("Default", "red");
console.log(project1);
const todo1 = new ToDo("Stinky", "Farting all the time", format(new Date(2026, 0, 31), "dd.MM.yyyy"), true);
console.table(todo1);
console.table(project1);
project1.addToDo(todo1);
todo1.addNote("Hi everyone! I am a note!");
console.log(todo1.notes);
todo1.addCheckListItem("Hi");
console.table(todo1.checklist[0].item);
console.table(todo1);