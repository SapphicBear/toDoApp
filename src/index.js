import "./styles.css";
import { format, intervalToDuration, isThisQuarter } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { Button, Element, Checkbox } from "./DOM.js";
console.log("Javascript connected!");

const dataBase = {
    saveData(name, obj) {
    localStorage.setItem(name, JSON.stringify(obj));
},

    checkData() {
        const allKeys = Object.keys(localStorage);
        console.log(allKeys);
        return allKeys;
},

    getData() {
    let data;
    if (localStorage.length == 0) {
        return data = 0;
    } else {
        data = [];
        let allKeys = this.checkData();
        for (let i = 0; i < allKeys.length; i++) {
            data.push(JSON.parse(localStorage.getItem(allKeys[i])));
        }
        return data;
    }} 
}

class toDoCard {
    constructor(name, fun) {
        this.name = name;
        this.fun = fun;
    }
    toDoCard = [];
    card = new Element("div", ".card-area", `todo-${this.name}`);
    title = new Element("h3", `.todo-${this.name}`, `${this.name}-title`, this.fun.title);
    desc = new Element("p", `.todo-${this.name}`, `${this.name}-description`, this.fun.description);
    dueDate = new Element("p", `.todo-${this.name}`, `${this.name}-due-date`, this.fun.dueDate);
    importance = new Element("h4", `.todo-${this.name}`, `${this.name}-importance`, this.fun.importance);
    notesArea = new Element("ul", `.todo-${this.name}`, `${this.name}-notes`);
    checklist = new Element("ul", `.todo-${this.name}`, `${this.name}-checklist-area`);

    renderShortCard() {
        this.toDoCard.push(this.card, this.title, this.desc, this.dueDate);
        this.toDoCard.forEach((item) => {
            item.makeElement();
        })
    }
}
const renderCard = {
    
    createCard(name, fun) {
    name = name;
    let todoCard = [];
    const card = new Element("div", ".card-area", `todo-${name}`);
    const title = new Element("h3", `.todo-${name}`, `${name}-title`, fun.title);
    const desc = new Element("p", `.todo-${name}`, `${name}-description`, fun.description);
    const dueDate = new Element("p", `.todo-${name}`, `${name}-due-date`, fun.dueDate);
        todoCard.push(card, title, desc, dueDate);
        todoCard.forEach((item) => {
            item.makeElement();
        })
},

    createFullCard(name, fun) {
    name = name;
    let todoCard = [];
    this.createCard(name, fun)
    const importance = new Element("h4", `.todo-${name}`, `${name}-importance`, fun.importance);
    const notesArea = new Element("ul", `.todo-${name}`, `${name}-notes`);
    const checklist = new Element("ul", `.todo-${name}`, `${name}-checklist-area`);
    
    todoCard.push(importance, notesArea, checklist);
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
}} 
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

function initialRun() {
    let data = dataBase.getData();
    console.log(data)
    if (data == 0) {
        console.log("No files found");
        return;
    } else {
        console.log(data.length)
        console.log(data)
        if (data.length == 1) {
            renderCard.createCard(`${data[0].title}-card`, getToDo(data[0]));
            console.log("drawing once");
        } else if (data.length > 1) {
            for (let i = data.length - 1; i >= 0; i--) {
            renderCard.createCard(`card-${data[i].title}`, getToDo(data[i]))
            console.log("drawing cards found in localStorage")
            }
        }
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