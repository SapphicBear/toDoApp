import "./styles.css";
import { format, intervalToDuration, isThisQuarter } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { dataBase } from "./database.js";
import { Button, Element, Checkbox } from "./DOM.js";

console.log("Javascript connected!");
let cardBody = [];
let madeCards = [];

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

    openCard(item) {
        let active = item;
        
        cardBody.forEach((card) => {
            if ("todo-" + card.name === active.classList[0])  {
                card.renderFullCard();
            let extras = document.querySelectorAll(`.todo-${card.name}`);
                extras.forEach((extra) => {
                    if (!extra.classList.contains("_active")) {
                        extra.remove();
                    } else {
                        return;
                    }
                })
            } 
            })
    },
    
    closeCard(item) {
        let inactive = item;
        
        cardBody.forEach((card) => {
            if ("todo-" + card.name === inactive.classList[0])  {
                card.renderShortCard();
                let extras = document.querySelectorAll(`.todo-${card.name}`);
                extras.forEach((extra) => {
                    if (!extra.classList.contains("_inactive")) {
                        extra.remove();
                    } else {
                        return;
                    }  
            })
            
            }})
    },

    cardHandler(item) {
        try {
            if (item.classList.contains("_active")) { 
            this.setCardInactive(item);
            this.closeCard(item);
            cardListener();
        } else if (item.classList.contains("_inactive")) {
            this.setCardAsActive(item);
            this.openCard(item);
            cardListener();
        }
        }
        catch {
            console.log("ignore this bug")
        }
    },

    setCardAsActive(item) {
        
        item.classList.replace("_inactive", "_active");
        
    },
    setCardInactive(item) {
        
        item.classList.replace("_active", "_inactive");
    },
    
}
    const openModal = document.querySelector(".open-button");
    const closeModal = document.querySelector(".close-button.modal");
    const submitButton = document.querySelector(".submit-button");
    const addNoteButton = document.querySelector(".add-note");
    const modal = document.querySelector(".modal");
    const projectButton = document.querySelector(".new-project")
    const projectModal = document.querySelector(".project-modal")
    const projectModalClose = document.querySelector(".close-button.project-modal")

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

projectButton.addEventListener("click", function () {
    projectModal.showModal();
})
projectModalClose.addEventListener("click", function () {
    projectModal.close();
})

function cardListener() {
    let cards = document.querySelectorAll(`.card-area > div[class^="todo"] > h3`);
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {
            eventListeners.cardHandler(cards[i].parentElement)
        })
    }
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
            let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
            cards.classList.add("_inactive");           
        } else if (data.length > 1) {
            for (let i = data.length - 1; i >= 0; i--) {
                let card = new ToDoCard(`${data[i].title}-card`, data[i])
                card.renderShortCard();
                console.log("drawing cards found in localStorage")
                cardBody.push(card);
                let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
                cards.forEach((item) => {
                    item.classList.add("_inactive")
                })
                
            }
        }
        cardListener();
    }
}


initialRun();
console.log(cardBody)