import "./styles.css";
import { format, intervalToDuration } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { Button, Element, Checkbox } from "./DOM.js";
console.log("Javascript connected!");


function getToDoDB() {
    // Function to check and fetch data if JSON is saved! Will go on to the getToDo() if it finds nothing, it exits. If it finds it, it uses the getToDo to write to screen
}

function getToDo(title, description, date, importance, checklist, note) {
    const toDo = new ToDo(title, description, format(new Date(date), "dd.MM.yyyy"), importance);
    if (checklist) {
        toDo.checklist.push(checklist);
    }
    if (note) {
        toDo.notes.push(note);
    }
    return toDo
}

function createCard(name, fun) {
    name = name;
    let todoCard = [];
    const card = new Element("div", ".card-area", `todo-${name}`);
    const title = new Element("h3", `.todo-${name}`, `${name}-title`, fun.title);
    const desc = new Element("p", `.todo-${name}`, `${name}-description`, fun.description);
    const dueDate = new Element("p", `.todo-${name}`, `${name}-due-date`, fun.dueDate);
    const importance = new Element("h4", `.todo-${name}`, `${name}-importance`, fun.importance);
    const notesArea = new Element("ul", `.todo-${name}`, `${name}-notes`);
    const checklist = new Element("ul", `.todo-${name}`, `${name}-checklist-area`);
    
    todoCard.push(card, title, desc, dueDate, importance, notesArea, checklist);
    todoCard.forEach((item) => {
        item.makeElement();
    })
  
    try {
        let noteCount = 0;
        fun.notes[0].forEach((item) => {
            let li = new Element("li", `.${name}-notes`, `${name}-note-${noteCount}`, item);
            let xButton = new Button(`.${name}-note-${noteCount}`, `${name}button-${noteCount}`, "x");
            li.makeElement();
            xButton.makeElement();
            ++noteCount;
    })
    }
    catch{
        let noteCount = 0;
        fun.notes.forEach((item) => {
            let li = new Element("li", `.${name}-notes`, `${name}-note-${noteCount}`, item);
            let xButton = new Button(`.${name}-note-${noteCount}`, `${name}button-${noteCount}`, "x");
            li.makeElement();
            xButton.makeElement();
        })
    }
    try {
        let checkCount = 0;
        fun.checklist[0].forEach((item) => {
            const li = new Element("li", `.${name}-checklist-area`, `${name}-checklist-${checkCount}`, item)
            const checkmark = new Checkbox(`.${name}-checklist-${checkCount}`, `${name}-checkbox-${checkCount}`)
            
            li.makeElement();
            checkmark.makeElement();
            const checkbox = document.querySelector(`.${name}-checkbox-${checkCount}`);
            checkbox.setAttribute("id", `${name}-checkbox-${checkCount}`);
            checkbox.setAttribute("type", "checkbox");
            checkbox.removeAttribute("class");
            ++checkCount;
        })
    }
    catch {
        let checkCount = 0;
        fun.checklist.forEach((item) => {
            const li = new Element("li", `.${name}-checklist-area`, `${name}-checklist-${checkCount}`, item)
            const checkmark = new Checkbox(`.${name}-checklist-${checkCount}`, `${name}-checkbox-${checkCount}`)
            
            li.makeElement();
            checkmark.makeElement();
            const checkbox = document.querySelector(`.${name}-checkbox-${checkCount}`);
            checkbox.setAttribute("id", `${name}-checkbox-${checkCount}`);
            checkbox.setAttribute("type", "checkbox");
            checkbox.removeAttribute("class");
    })
    
}}
createCard("todo1", getToDo("Stinky", "sdngmlksdjfnmglkdflg", "2026, 12, 01", "true", ["Need to do this soon!", "make out with wife"], ["Hi HI hi!", "Note 2"]));
createCard("todo2", getToDo("Farting all the time", "Stinkying adsift ksmdfglksdfnmgsdflkasdfjnmg", "2026, 12, 02", "false", ["lsdfkmgsdkfmg", "sdfoginsdlfkgjnsdlfkg", "sflkgmsdlfkgm"], "stkmgdlfkgm"));
