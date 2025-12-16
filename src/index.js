import "./styles.css";
import { format, intervalToDuration } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { Button, Element, Checkbox } from "./DOM.js";
console.log("Javascript connected!");


function saveData(name, obj) {
    localStorage.setItem(name, JSON.stringify(obj));
}
function checkData() {
        const allKeys = Object.keys(localStorage);
        console.log(allKeys);
        return allKeys;
}
function getData() {
    let data;
    if (localStorage.length == 0) {
        return data = 0;
    } else {
        data = [];
        let allKeys = checkData();
        for (let i = 0; i < allKeys.length; i++) {
            data.push(JSON.parse(localStorage.getItem(allKeys[i])));
        }
        return data;
    }
}


function initialRun() {
    let data = getData();
    if (data == 0) {
        console.log("No files found");
        return;
    } else {
        console.log(data.length)
        console.log(data)
        if (data.length == 1) {
            createCard(`${data[0].title}-card`, getToDo(data[0]));
            console.log("drawing once");
        } else if (data.length > 1) {
            for (let i = data.length - 1; i >= 0; i--) {
            createCard(`card-${data[i].title}`, getToDo(data[i]))
            console.log("drawing cards found in localStorage")
            }
        }
    }
    
}


function getToDo(obj) {
    const toDo = new ToDo(obj.title, obj.description, obj.dueDate, obj.importance);
    obj.checklist.forEach((item) => {
        toDo.checklist.push(item);
    })
    obj.notes.forEach((item) => {
        toDo.notes.push(item);
    })
    console.log(toDo)
        toDo.dueDate = format(new Date(obj.dueDate), "dd.MM.yyyy");
        console.log("formating date");
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
  if (!fun.notes.length == 0) {
    
        let noteCount = 0;
        fun.notes.forEach((item) => {
            let li = new Element("li", `.${name}-notes`, `${name}-note-${noteCount}`, item);
            let xButton = new Button(`.${name}-note-${noteCount}`, `${name}button-${noteCount}`, "x");
            li.makeElement();
            xButton.makeElement();
            ++noteCount;
    })
} else {
    console.log("No items in notes");
  
} if (!fun.checklist.length == 0) {
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
            ++checkCount;
        })
} else {
    console.log("No items in checklsit.");
}
} 


const myObj = {
    title: "Stinky",
    description: "Fart",
    dueDate: "2025, 11, 2",
    importance: true,
    checklist: [
        "stinky",
        "Stinky"
    ],
    notes: [
        "I am very stinky",
    ],
}
initialRun();