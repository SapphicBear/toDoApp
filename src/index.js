import "./styles.css";
import { format, toDate } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { dataBase } from "./database.js";
import { Button, Element, Checkbox } from "./DOM.js";

console.log("Javascript connected!");
let cardBody = [];
let key = localStorage.length;
let projects = [];
let currentProject = ""
const userInput = {
    title:"", 
    description:"",
    dueDate:"",
    importance: false,
    checklist: [],
    notes: [],
    project: "",
}


class ToDoCard {
    constructor(name, obj) {
        this.name = name.replaceAll(/\s/g,'');
        this.obj = this.getToDo(obj);
        this.card = new Element("div", ".card-area", `todo-${this.name}`);
        this.title = new Element("h3", `.todo-${this.name}`, `${this.name}-title`, this.obj.title);
        this.desc = new Element("p", `.todo-${this.name}`, `${this.name}-description`, this.obj.description);
        this.dueDate = new Element("p", `.todo-${this.name}`, `${this.name}-due-date`, format(new Date(this.obj.dueDate), "dd.MM.yyyy"));
        this.importance = new Element("h4", `.todo-${this.name}`, `${this.name}-importance`, this.obj.importance);
        this.notesArea = new Element("ul", `.todo-${this.name}`, `${this.name}-notes`);
        this.checklist = new Element("ul", `.todo-${this.name}`, `${this.name}-checklist-area`);
        this.editButton = new Button(`.todo-${this.name}`, `todo-${this.name}-editButton`, "Edit");
    }
    toDoCard = [];
    project = [];

    getToDo(obj) {
    const toDo = new ToDo(obj.title, obj.description, obj.dueDate, obj.importance);
        obj.checklist.forEach((item) => {
        toDo.checklist.push(item);
        })
        obj.notes.forEach((item) => {
        toDo.notes.push(item);
    })
    toDo.dueDate = obj.dueDate;
    toDo.project = obj.project;
    return toDo;
}

    renderShortCard() {
        this.toDoCard.push(this.card, this.title, this.desc, this.dueDate);
        this.toDoCard.forEach((item) => {
            item.makeElement();
        })
    }

    renderFullCard() {
        this.toDoCard.push(this.card, this.title, this.desc, this.dueDate, this.importance, this.notesArea, this.checklist, this.editButton);
        this.toDoCard.forEach((item) => {
            item.makeElement();
        })
        if (!this.obj.notes.length == 0) {
        let noteCount = 0;
        this.obj.notes.forEach((item) => {
            this.name.replaceAll(/\s/g,'');
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
            this.name.replaceAll(/\s/g,'');
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
    addNote(arg) {
        if (arg == "") {
            arg = document.getElementById("notes").value;
        } else {
            arg = arg;
        }
        
        const li = new Element("li", `ul.notes-area`, `note-item-${num}`, "");
        const para = new Element("p", `.note-item-${num}`, `para${num}`, arg);
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

    compareData() {

    },

    submitData() {
        let title, description, dueDate, importance;
        let checklist = [];
        let notes = [];
            title = document.getElementById("title").value;
            description = document.getElementById("description").value;
            dueDate = format(new Date(document.getElementById("due-date").value), "yyyy-MM-dd");
            importance = document.getElementById("importance").value;
            notes = document.querySelectorAll(`ul > li > p`);

            userInput.title = title;
            userInput.description = description;
            userInput.dueDate = dueDate;
            userInput.importance = importance;
            notes.forEach((item) => {
                userInput.notes.push(item.textContent);
            })
            userInput.project = `${currentProject}`;
                console.log(userInput);
            const card = new ToDoCard(userInput.title, userInput);
            card.obj.id = key;
            dataBase.saveData(`key${card.obj.id}`, card.obj);
            initialRun();
            ++key;
    },

    openCard(item) {
        let active = item;
        cardBody.forEach((card) => {
            if ("todo-" + card.name === active.classList[0])  {
                card.renderFullCard();
                toDoCardListener(active.children[6], card.obj);
            let extras = document.querySelectorAll(`.todo-${card.name}`);
            console.log(extras)
                extras.forEach((extra) => {
                    if (!extra.className.includes("_active")) {
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
        console.log(inactive.classList[0])
        cardBody.forEach((card) => {
            console.log(card.name)
            if (inactive.className.includes(`todo-${card.name}`))  {
                card.renderShortCard();
                let extras = document.querySelectorAll(`.todo-${card.name}`);
                console.log(extras)
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
            if (item.className.includes("_active")) { 
            this.setCardInactive(item);
            this.closeCard(item);
            cardListener();
        } else if (item.className.includes("_inactive")) {
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

function toDoCardListener(obj, todo) {
    const toDoCardEditButton = obj;
    toDoCardEditButton.addEventListener("click", function () {
        document.querySelector(".submit-button").classList.add("edit");
    editToDo(todo);
    
})
}

    const openModal = document.querySelector(".open-button");
    const closeModal = document.querySelector(".close-button.modal");
    const submitButton = document.querySelector(".submit-button");
    const addNoteButton = document.querySelector(".add-note");
    const modal = document.querySelector(".modal");
    const projectButton = document.querySelector(".new-project")
    const projectModal = document.querySelector(".project-modal")
    const projectModalClose = document.querySelector(".close-button.project-modal")
    const projectModalSubmit = document.querySelector(".project-modal-submit");
    
    
    openModal.addEventListener("click", () => {
        modal.showModal();
})
    
    closeModal.addEventListener("click", () => {
        clearModal();
        modal.close();

})
    addNoteButton.addEventListener("click", function () {
        eventListeners.addNote();
        eventListeners.deleteNoteButton();
    });

    function clearModal() {
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("due-date").value = "";
            document.getElementById("importance").value = "";
            document.getElementById("notes").value = "";
            document.querySelectorAll(`ul.notes-area > li`).forEach((item) => {
                item.remove();
            });
    }
    submitButton.addEventListener("click", () => {
        if (submitButton.classList.contains("edit")) {
            return;
        } eventListeners.submitData();
        clearModal();
        modal.close();
})

projectButton.addEventListener("click", function () {
    projectModal.showModal();
})
projectModalClose.addEventListener("click", function () {
    projectModal.close();
})

projectModalSubmit.addEventListener("click", function () {
    const project = createProject(document.getElementById("project-name").value, document.getElementById("project-color").value);
    renderProject(project);
    projectModal.close();
    projectListener();
})

function editToDo(todo) {
    console.log(todo)
    console.log(todo.dueDate)
    console.log(todo.id)
    const currentId = todo.id;
    let title, description, dueDate, importance, id;
        let checklist = [];
        let notes = [];
            title = todo.title;
            description = todo.description;
            dueDate = todo.dueDate
            console.log(dueDate)
            importance = todo.importance;
            notes = todo.notes;
            todo.id = currentId;
            console.log(dueDate)
            document.getElementById("title").value = title;
            document.getElementById("description").value = description;
            document.getElementById("due-date").value = dueDate;
            document.getElementById("importance").value = importance;
            todo.notes.forEach((note)=> {
            eventListeners.addNote(note);
            eventListeners.deleteNoteButton();
            })
    modal.showModal();
    const editSubmitButton = document.querySelector(".submit-button.edit")
    editSubmitButton.addEventListener("click", function () {
        console.log("hi")
        modal.close();
    })
}


function projectListener() {
    const projectArea = document.querySelectorAll(`.project-area-ul > li`)

    for (let i = 0; i < projectArea.length; i++) {
        projectArea[i].addEventListener("click", function () {
            projectHandler(projectArea[i]);
        })
    }
}

function projectHandler(item) {
    projects.forEach((project) => {
        if (item.className.includes(`${project.name}`)) {
            currentProject = `${project.name}`;
            console.log(`Selected: ${project.name}`)
            deleteAllCards();
            changePage(project);
        } else {
            cardListener();
            return;
        }
    })
}

function cardListener() {
    let cards = document.querySelectorAll(`.card-area > div[class^="todo"] > h3`);
    
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function () {
            eventListeners.cardHandler(cards[i].parentElement)
        })
    }
}
let projectNum = 1;
function createProject(name, color) {
    const project = new Project(name, color);
        console.log("Project made!");
    projects.push(project);
    dataBase.saveData(`${project.name}`, project)
    return project;
}

function renderProject(project) {
    ++projectNum
    let li = new Element("li", ".project-area-ul", `project-${projectNum}-${project.name}`, `${project.name}`);
    if (!project.color) {
         li.makeElement();
    } else {
        let span = new Element("span", `.project-${projectNum}-${project.name}`, `project-color-${projectNum}-${project.name}`);
        li.makeElement();
        span.makeElement();
        document.querySelector(`.project-color-${projectNum}-${project.name}`).style.backgroundColor = `${project.color}`
    }
}

function deleteAllCards() {
    let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);    
    cards.forEach((item) => {
            item.remove();
        })
}

function changePage(project) {
    let data = dataBase.getData();
    console.log(`Data Length: ${data.length}`)
    if (data == 0) {
        console.log("No files found");
            cardListener();
            projectListener()
        return;
    }
    console.log(data)
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].project === project.name) {
            let card = new ToDoCard(`${data[i].title}-card`, data[i])
                card.renderShortCard();
                let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
                        cards.forEach((item) => {
                            item.classList.add("_inactive")})
        }
    } 
    cardListener();
}

function defaultProject() {
    let projectHome = new Project("Home");
    renderProject(projectHome);
    projects.push(projectHome);
    currentProject = projectHome.name;
}

function initialRun() {
    deleteAllCards();
    let projectsLi = document.querySelectorAll(".project-area-ul > li");
    projectsLi.forEach((li) => {
        li.remove();
    })
    defaultProject();
    let data = dataBase.getData();
    console.log(`Data Length: ${data.length}`)
    if (data == 0) {
        console.log("No files found");
            cardListener();
            projectListener()
        return;
    } else {
        if (data.length == 1) {
            if (data[0].isProject == true) {
                console.log("project detected. Rendering Project Separately")
                renderProject(data[0]);
                projects.push(data[0])
                    cardListener();
                    projectListener()
                return;
            } else {
            let card = new ToDoCard(`${data[0].title}-card`, data[0])
                card.renderShortCard();
                console.log("drawing one todo");
                cardBody.push(card);
                let cards = document.querySelector(`.card-area > div[class^="todo"]`);
                console.log(cards)
                cards.classList.add("_inactive"); 
                    
            }    
        } else if (data.length > 1) {
            for (let i = data.length - 1; i >= 0; i--) {
                if (data[i].isProject == true) {
                    console.log(`project detected, drawing project`)
                    renderProject(data[i]);
                    projects.push(data[i])
                    continue;
                } else {
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
        }
        cardListener();
        projectListener()
    }
}


initialRun();
key = cardBody.length;
console.log(cardBody)
console.log(projects)
console.log(currentProject);