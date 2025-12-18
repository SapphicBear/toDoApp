import "./styles.css";
import { format, intervalToDuration, isThisQuarter } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { dataBase } from "./database.js";
import { Button, Element, Checkbox } from "./DOM.js";

console.log("Javascript connected!");
let cardBody = [];


class ToDoCard {
    constructor(name, obj) {
        this.name = name.replaceAll(/\s/g,'');
        this.obj = this.getToDo(obj);
        this.card = new Element("div", ".card-area", `todo-${this.name}`);
        this.title = new Element("h3", `.todo-${this.name}`, `${this.name}-title`, this.obj.title);
        this.desc = new Element("p", `.todo-${this.name}`, `${this.name}-description`, this.obj.description);
        this.dueDate = new Element("p", `.todo-${this.name}`, `${this.name}-due-date`, this.obj.dueDate);
        this.importance = new Element("h4", `.todo-${this.name}`, `${this.name}-importance`, this.obj.importance);
        this.notesArea = new Element("ul", `.todo-${this.name}`, `${this.name}-notes`);
        this.checklist = new Element("ul", `.todo-${this.name}`, `${this.name}-checklist-area`);
    }
    toDoCard = [];

    getToDo(obj) {
    const toDo = new ToDo(obj.title, obj.description, obj.dueDate, obj.importance);
        obj.checklist.forEach((item) => {
        toDo.checklist.push(item);
        })
        obj.notes.forEach((item) => {
        toDo.notes.push(item);
    })
    toDo.dueDate = obj.dueDate;
    return toDo;
}

    renderShortCard() {
        this.toDoCard.push(this.card, this.title, this.desc, this.dueDate);
        this.toDoCard.forEach((item) => {
            item.makeElement();
        })
    }

    renderFullCard() {
        this.toDoCard.push(this.card, this.title, this.desc, this.dueDate, this.importance, this.notesArea, this.checklist);
        this.toDoCard.forEach((item) => {
            item.makeElement();
        })
        if (!this.obj.notes.length == 0) {
        let noteCount = 0;
        this.obj.notes.forEach((item) => {
            let li = new Element("li", `.${this.name}-notes`, `${this.name}-note-${noteCount}`, item);
            let xButton = new Button(`.${this.name}-note-${noteCount}`, `${this.name}button-${noteCount}`, "x");
            li.makeElement();
            xButton.makeElement();
            ++noteCount;
        })
    } else {
        console.log("No items in notes");
  
    } if (!this.obj.checklist.length == 0) {
        let checkCount = 0;
        this.obj.checklist.forEach((item) => {
            const li = new Element("li", `.${this.name}-checklist-area`, `${this.name}-checklist-${checkCount}`,`${item}`);
            const checkmark = new Checkbox(`.${this.name}-checklist-${checkCount}`, `${this.name}-checkbox-${checkCount}`);
            
            li.makeElement();
            checkmark.makeElement();
            const checkbox = document.querySelector(`.${this.name}-checkbox-${checkCount}`);
            checkbox.setAttribute("id", `${this.name}-checkbox-${checkCount}`);
            checkbox.setAttribute("type", "checkbox");
            checkbox.removeAttribute("class");
            ++checkCount;
            })
    } else {
        console.log("No items in checklsit.");
        }
    }
}

let num = 1;
const eventListeners = {
    addNote() {
        const li = new Element("li", `ul.notes-area`, `note-item-${num}`, "");
        const para = new Element("p", `.note-item-${num}`, `para${num}`, document.getElementById("notes").value);
        const xButton = new Button(`.note-item-${num}`, `note-item-${num}-xButton`, "X");

        li.makeElement();
        para.makeElement();
        xButton.makeElement();
        document.querySelector(`.note-item-${num}-xButton`).setAttribute("type", "button");
        ++num;
    },

    deleteNoteButton() {
        let closeButtons = document.querySelectorAll("ul > li > button");
        closeButtons.forEach((button) => {
            button.addEventListener("click", function () {
                let li = this.parentElement;
                li.remove();
            })
        })
    },

    submitData() {
        let title, description, dueDate, importance;
    let checklist = [];
    let notes = [];
    title = document.getElementById("title").value;
    description = document.getElementById("description").value;
    dueDate = format(new Date(document.getElementById("due-date").value), "dd.MM.yyyy");
    importance = document.getElementById("importance").value;
    notes = document.querySelectorAll(`ul > li > p`);

    userInput.title = title;
    userInput.description = description;
    userInput.dueDate = dueDate;
    userInput.importance = importance;
    notes.forEach((item) => {
        userInput.notes.push(item.textContent);
    })
    console.log(userInput);
    const card = new ToDoCard("NewCard", userInput);
    dataBase.saveData(card.obj.title, card.obj);
    initialRun();
    },

    openCard() {
        let active = document.getElementById("active");
        console.log(active);
        cardBody.forEach((item) => {
            if ("todo-" + item.name === active.className)  {
            let newCard = new ToDoCard(item.name, item.obj)
            newCard.renderFullCard();
            document.querySelector(`.todo-${item.name}`).setAttribute("id", "active");
            console.log("complete")
            let extras = document.querySelectorAll(`.todo-${item.name}`);
                extras.forEach((item) => {
                    if (item.id == "") {
                        item.remove();
                    } else {
                        return;
                    }
                })
            } 
            })
    },
    
    closeCard() {
        let inactive = document.getElementById("inactive");
        console.log(inactive);
        cardBody.forEach((item) => {
            if ("todo-" + item.name === inactive.className)  {
            let newCard = new ToDoCard(item.name, item.obj)
            inactive.remove();
            newCard.renderShortCard();
            document.querySelector(`.todo-${item.name}`).setAttribute("id", "inactive");
            console.log("complete")
            } 
            })
    },

    cardHandler(item) {
        if (item.id == "") {
            this.setCardAsActive(item)
            this.openCard();
            cardListener();
        } else if (item.id === "active") { 
            this.setCardInactive(item);
        } else if (item.id === "inactive") {
            initialRun();
        }
    },

    setCardAsActive(item) {
        item.setAttribute("id", "active");
    },
    setCardInactive(item) {
        item.setAttribute("id", "inactive")
    },
    
}
    const openModal = document.querySelector(".open-button");
    const closeModal = document.querySelector(".close-button");
    const submitButton = document.querySelector(".submit-button");
    const addNoteButton = document.querySelector(".add-note");
    const modal = document.querySelector(".modal");

    openModal.addEventListener("click", () => {
        modal.showModal();
})
    
    closeModal.addEventListener("click", () => {
        modal.close();

})
    addNoteButton.addEventListener("click", function () {
        eventListeners.addNote();
        eventListeners.deleteNoteButton();
    });

    submitButton.addEventListener("click", () => {
        eventListeners.submitData();
            modal.close();
})

function cardListener() {
    let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
    cards.forEach((item) => {
        console.log(cards)
        item.addEventListener("click", function () {
            eventListeners.cardHandler(item);
        })
})
}

const userInput = {
    title:"", 
    description:"",
    dueDate:"",
    importance: false,
    checklist: [],
    notes: [],
}


function initialRun() {
    let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
        cards.forEach((item) => {
            item.remove();
        })
    let data = dataBase.getData();
    console.log(data.length)
    if (data == 0) {
        console.log("No files found");
        return;
    } else {
        if (data.length == 1) {
            let card = new ToDoCard(`${data[0].title}-card`, data[0])
            card.renderShortCard();
            console.log("drawing once");
            cardBody.push(card);
            cardListener();            
        } else if (data.length > 1) {
            for (let i = data.length - 1; i >= 0; i--) {
                let card = new ToDoCard(`${data[i].title}-card`, data[i])
                card.renderShortCard();
                console.log("drawing cards found in localStorage")
                cardBody.push(card);
                cardListener();
            }
        }
    }
}


initialRun();
console.log(cardBody)
