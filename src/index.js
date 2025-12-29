import "./styles.css";
import { format, toDate } from "date-fns";
import { ToDo } from "./todos.js";
import { Project } from "./projects.js";
import { dataBase } from "./database.js";
import { Button, Element, Checkbox } from "./DOM.js";

console.log("Javascript connected!");
let cardBody = [];
let currentData;
let key = 0;
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
    id: 0,
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
        this.buttonArea = new Element("div", `.todo-${this.name}`, `todo-${this.name}-button-area`)
        this.editButton = new Button(`.todo-${this.name}-button-area`, `todo-${this.name}-editButton`, "Edit");
        this.deleteButton = new Button(`.todo-${this.name}-button-area`, `todo-${this.name}-deleteButton`, "Delete");
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
        this.toDoCard.push(this.card, this.title, this.desc, this.dueDate, this.importance, this.notesArea, this.checklist, this.buttonArea, this.editButton, this.deleteButton);
        this.toDoCard.forEach((item) => {
            item.makeElement();
        })
        if (!this.obj.notes.length == 0) {
        let noteCount = 0;
        this.obj.notes.forEach((item) => {
            this.name.replaceAll(/\s/g,'');
            let li = new Element("li", `.${this.name}-notes`, `${this.name}-note-${noteCount}`, item);
            // let xButton = new Button(`.${this.name}-note-${noteCount}`, `${this.name}button-${noteCount}`, "x");
            li.makeElement();
            // xButton.makeElement();
            ++noteCount;
        })
    } else {
        console.log("No items in notes");
  
    } if (!this.obj.checklist.length == 0) {
        let checkCount = 0;
        this.obj.checklist.forEach((item) => {
            this.name.replaceAll(/\s/g,'');
            const li = new Element("li", `.${this.name}-checklist-area`, `${this.name}-checklist-${checkCount}`,`${item}`);
            // const checkmark = new Checkbox(`.${this.name}-checklist-${checkCount}`, `${this.name}-checkbox-${checkCount}`);
            
            li.makeElement();
            // checkmark.makeElement();
            // const checkbox = document.querySelector(`.${this.name}-checkbox-${checkCount}`);
            // checkbox.setAttribute("id", `${this.name}-checkbox-${checkCount}`);
            // checkbox.setAttribute("type", "checkbox");
            // checkbox.removeAttribute("class");
            ++checkCount;
            })
    } else {
        console.log("No items in checklsit.");
        }
    }
}

let num = 1;
const eventListeners = {
    addCheckListItem(arg) {
        if (arg == "") {
            arg = document.getElementById("checklist").value;
        } else {
            arg = arg;
        }
        const li = new Element("li", `ul.checklist-area`, `checklist-item-${num}`, "");
        const para = new Element("p", `.checklist-item-${num}`, `check-para${num}`, arg);
        const xButton = new Button(`.checklist-item-${num}`, `checklist-item-${num}-xButton`, "X");

        li.makeElement();
        para.makeElement();
        xButton.makeElement();
        document.querySelector(`.checklist-item-${num}-xButton`).setAttribute("type", "button");
        ++num;
    },

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


    submitData(arg, key) {
        let title, description, dueDate, importance;
        let checklist = [];
        let notes = [];
            title = document.getElementById("title").value;
            description = document.getElementById("description").value;
            dueDate = format(new Date(document.getElementById("due-date").value), "yyyy-MM-dd");
            importance = document.getElementById("importance").value;
            notes = document.querySelectorAll(`.notes-area-div > ul > li > p`);
            checklist = document.querySelectorAll(`.checklist-area-div > ul > li > p`);

            userInput.title = title;
            userInput.description = description;
            userInput.dueDate = dueDate;
            userInput.importance = importance;
            notes.forEach((item) => {
                userInput.notes.push(item.textContent);
            })
            checklist.forEach((item) => {
                userInput.checklist.push(item.textContent);
            })

            userInput.id = key;
            userInput.project = `${currentProject}`;
            
            if (arg == "" || arg == undefined || arg == null) {
                arg = userInput;
            } else {
                arg = arg;
            }
            dataBase.saveData(`key${key}`, arg);
            return userInput;
    },

    drawCard(todoCard) {
                let card = new ToDoCard(todoCard.title, todoCard)
                card.renderShortCard();
                cardBody.push(card);
                let card1 = document.querySelector(`.card-area > div[class^="todo-${card.obj.title}"]`)
                card1.classList.add("_inactive")
    },

    openCard(item) {
        let active = item;
        cardBody.forEach((card) => {
            if ("todo-" + card.name === active.classList[0])  {
                card.renderFullCard();
                deleteButtonCardListener(active.children[6].children[1], card)
                toDoCardListener(active.children[6].children[0], card.obj);
            let extras = document.querySelectorAll(`.todo-${card.name}`);
                extras.forEach((extra) => {
                    if (!extra.className.includes("_active")) {
                        extra.remove();
                    } else {
                        console.log("No extras");
                    }
                })
            } 
            })
    },
    
    closeCard(item) {
        let inactive = item;
        cardBody.forEach((card) => {
            if (inactive.className.includes(`todo-${card.name}`))  {
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
    const addChecklistButton = document.querySelector(".add-checklist")
    const modal = document.querySelector(".modal");
    const projectButton = document.querySelector(".new-project")
    const projectModal = document.querySelector(".project-modal")
    const projectModalClose = document.querySelector(".close-button.project-modal")
    const projectModalSubmit = document.querySelector(".project-modal-submit");
    
    
openModal.addEventListener("click", () => {
    modal.showModal();
})
    
closeModal.addEventListener("click", () => {
    if (document.querySelector(".submit-button").classList.contains("edit")) {
        document.querySelector(".submit-button").classList.remove("edit");
    }
    clearModal();
    modal.close();

})
addNoteButton.addEventListener("click", function () {
    eventListeners.addNote(document.getElementById("notes").value);
    eventListeners.deleteNoteButton();
});

addChecklistButton.addEventListener("click", function () {
    eventListeners.addCheckListItem(document.getElementById("checklist").value);
    eventListeners.deleteNoteButton();
})

submitButton.addEventListener("click", () => {
    if (submitButton.classList.contains("edit")) {
        return;
    }
    if (document.getElementById("due-date").value == "") {
        alert("Please enter a valid date")
        return
    } else {
        let card = eventListeners.submitData(userInput, key);
    eventListeners.drawCard(card);
    clearModal();
    cardListener();
    ++key;
    modal.close();
    }
    
        
})

projectButton.addEventListener("click", function () {
    projectModal.showModal();
})
projectModalClose.addEventListener("click", function () {
    projectModal.close();
})

projectModalSubmit.addEventListener("click", function () {
    if (document.getElementById("project-name").value == "") {
        alert("Please enter a valid name");
        
    } else {
        const project = createProject(document.getElementById("project-name").value, document.getElementById("project-color").value);
        renderProject(project);
        projectModal.close();
        projectListener();
        console.log("here")
    }
})

function clearModal() {
            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("due-date").value = "";
            document.getElementById("importance").value = "";
            document.getElementById("notes").value = "";
            document.getElementById("checklist").value = "";
            document.querySelectorAll(`ul.notes-area > li`).forEach((item) => {
                item.remove();
            });
            document.querySelectorAll(`ul.checklist-area > li`).forEach((item) => {
                item.remove();
            })
    }

function editToDo(todo) {
    
    let title, description, dueDate, importance;
        let checklist = [];
        let notes = [];
            title = todo.title;
            description = todo.description;
            dueDate = todo.dueDate
            importance = todo.importance;
            notes = todo.notes;
            checklist = todo.checklist;
            document.getElementById("title").value = title;
            document.getElementById("description").value = description;
            document.getElementById("due-date").value = dueDate;
            document.getElementById("importance").value = importance;
            notes.forEach((item) => {
                console.log(item)
                eventListeners.addNote(item)
                eventListeners.deleteNoteButton();
            })
            checklist.forEach((item) => {
                eventListeners.addCheckListItem(item);
                eventListeners.deleteNoteButton();
            })
            
    modal.showModal();
        editButtonListener(todo);
}
function checkForDelete() {
    cardBody.forEach((item) => {
        if (item.obj.delete == false) {
            return;
        } else if (item.obj.delete == true) {
            localStorage.removeItem(`key${item.obj.id}`)
            initialRun();
        }
    })
}


function deleteButtonCardListener(button, card) {
    const deleteButtonCard = button
    console.log(deleteButtonCard)
    deleteButtonCard.addEventListener("click", function () {
        console.log("Hi")
        card.obj.setDelete();
        console.log(card.obj.delete)
        let currentId = card.obj.id;
        checkForDelete();
    })
}

function editButtonListener(todo) {
    currentData = dataBase.checkData().sort();
    let currentId = todo.id;
    let currentCard;
    const editSubmitButton = document.querySelector(".submit-button.edit")
    editSubmitButton.addEventListener("click", function () {
        for (let i = 0; i < cardBody.length; i++) {
            if (cardBody[i].obj.id === todo.id) {
                currentCard = cardBody[i];
                break;
            } else {
                console.log("Looking for match...");
            }
        }
        console.log(currentCard)
        for (let i = 0; i < currentData.length; i++) {
            if (currentData[i] !== `key${currentId}`) {
                console.log("Key not Found");
                continue;
            } else if (currentData[i] == `key${currentId}`) {
                console.log("Key Found");
                todo.title = document.getElementById("title").value;
                todo.description = document.getElementById("description").value;
                todo.dueDate = document.getElementById("due-date").value;
                todo.importance = document.getElementById("importance").value;
                todo.notes = [];
                todo.checklist = [];
                let notes = document.querySelectorAll(`.notes-area-div > ul > li > p`);
                let checklist = document.querySelectorAll(`.checklist-area-div > ul > li > p`);
                notes.forEach((item) => {
                todo.notes.push(item.textContent);
                })
                checklist.forEach((item) => {
                    todo.checklist.push(item.textContent)
                })
                eventListeners.submitData(todo, currentId);
                todo.id = currentId;
                dataBase.saveData(`key${currentId}`, todo);
                modal.close();
                initialRun();
                clearModal();
                break;
            } else {
                throw new Error("No key!");
            }
        }
        
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
            console.log(currentProject)
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
    let separator = new Element("div", `.project-${projectNum}-${project.name}`, `separator-${projectNum}-${project.name}`);
    let deleteButton = new Button(`.separator-${projectNum}-${project.name}`, `project-delete-${projectNum}-${project.name}`, "X")
    if (project.name == "Home") {
        li.makeElement();
        return;
    } else {

    } if (!project.color) {
         li.makeElement();
         separator.makeElement();
         deleteButton.makeElement();
    } else {
        let span = new Element("span", `.separator-${projectNum}-${project.name}`, `project-color-${projectNum}-${project.name}`);
        li.makeElement();
        separator.makeElement();
        span.makeElement();
        deleteButton.makeElement();
        document.querySelector(`.project-color-${projectNum}-${project.name}`).style.backgroundColor = `${project.color}`
    }

}

function deleteAllCards() {
    let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);  
    cardBody = [];
    cards.forEach((item) => {
            item.remove();
        })}

function changePage(project) {
    let data = dataBase.getData();
    console.log(`Data Length: ${data.length}`)
    if (data == 0) {
        console.log("No files found");
            projectListener()
            projectDeleteListener()
        return;
    }
    console.log(data)
    for (let i = data.length - 1; i >= 0; i--) {
        if (data[i].project === project.name) {
            let card = new ToDoCard(`${data[i].title}-card`, data[i])
                card.renderShortCard();
                cardBody.push(card)
                let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
                        cards.forEach((item) => {
                            item.classList.add("_inactive")})
        }}
        cardListener();
        projectDeleteListener()
}
function projectDeleteListener() {
    let projectDelete = document.querySelectorAll(`button[class^="project-delete"]`);
    console.log(projectDelete)
    for (let i = 0; i < projectDelete.length; i++) {
        projectDelete[i].addEventListener("click", function () {
            let classname = projectDelete[i].className;
            console.log(projects);
            projects.forEach((item) => {
                if (classname.includes(item.name)) {
                    console.log(item)
                    item.delete = true;
                    localStorage.removeItem(item.name)
                }
            })
            let toDelete = projectDelete[i].parentElement.parentElement;
            toDelete.remove()
            deleteProject();
        })
    }
}
function deleteProject() {
    let index = projects.indexOf((item) => item.delete == true)
    projects.slice(index, 1)
}

// function defaultCard() {
//     let render = [];
//     let card = new Element("div", ".card-area", "default-card", "", "todo-default-card")
//     let c2a = new Element("h2", ".default-card", "call-to-action", "Click 'New ToDo' to make a ToDo!");
//     render.push(card);
//     render.push(c2a);
//     render.forEach((item) => {
//         item.makeElement();
//     })
// }

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
    if (data == 0) {
        console.log("No files found");
            cardListener();
            projectListener()
            projectDeleteListener()
            // defaultCard()
            return;
    } else {
        if (data.length == 1) {
            if (data[0].isProject == true) {
                renderProject(data[0]);
                projects.push(data[0])
                    cardListener();
                    projectListener()
                    projectDeleteListener()
                    // defaultCard()
                    return;
            } else {
            let card = new ToDoCard(`${data[0].title}-card`, data[0])
                localStorage.removeItem(`key${data[0].id}`)
                card.renderShortCard();
                card.obj.id = key;
                cardBody.push(card);
                let cards = document.querySelector(`.card-area > div[class^="todo"]`);
                cards.classList.add("_inactive");
                ++key; 
                    
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
                    localStorage.removeItem(`key${data[i].id}`)
                        
                        card.renderShortCard();
                        console.log("drawing cards found in localStorage")
                        card.obj.id = key;
                        cardBody.push(card);
                        ++key;
                        let cards = document.querySelectorAll(`.card-area > div[class^="todo"]`);
                        cards.forEach((item) => {
                            item.classList.add("_inactive")
                })
                }
                
            }
        }
        cardBody.forEach((item) => {
            dataBase.saveData(`key${item.obj.id}`, item.obj);
        })
        cardListener();
        projectListener()
        projectDeleteListener()
    }
}

initialRun();