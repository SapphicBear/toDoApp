import "./styles.css";
import { format } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { Button, Element, ToDoCard} from "./DOM.js";
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


const button1 = new Button("body", "button", "Submit");
button1.makeElement();
console.log(button1);
const div1 = new Element("div", "body", "wrapper");
div1.makeElement();
console.log(div1);
const para1 = new Element("p", ".wrapper", "wrapper-para", "Hi everyone and welcome to my new world!");
const para2 = new Element("p", ".wrapper", "para", "Hi!");
para1.makeElement();
para2.makeElement();
console.log(para1);
console.log(para2);

function init(name) {
    name = name;
    const toDo = new ToDo("Stinky", "Farting all the time", format(new Date(2026, 0, 31), "dd.MM.yyyy"), true);
    const card = new Element("div", ".card-area", `todo-${name}`);
    const title = new Element("h3", `.todo-${name}`, `${name}-title`, toDo.title);
    const desc = new Element("p", `.todo-${name}`, `${name}-description`, toDo.description);
    const dueDate = new Element("p", `.todo-${name}`, `${name}-due-date`, toDo.dueDate);
    const importance = new Element("h4", `.todo-${name}`, `${name}-importance`, toDo.importance);
    card.makeElement();
    title.makeElement();
    desc.makeElement()
    dueDate.makeElement()
    importance.makeElement()
    console.log(card)
    console.log(title);
}

init("card1");
init("card2");