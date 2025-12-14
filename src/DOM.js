export class Element{
    constructor(elementName, parent, className, textContent) {
        this.elementName = elementName;
        this.parent = parent;
        this.className = className;
        this.textContent = textContent;
    }
    makeElement() {
        document.querySelector(this.parent).appendChild(document.createElement(this.elementName)).className = this.className;
        if (this.textContent == undefined || this.textContent == null) {
            this.textContent = "";
        } 
            document.querySelector(`.${this.className}`).textContent = this.textContent;
    }
    
}

export class Button extends Element{
    constructor(parent, className, textContent) {
        super();
        this.elementName = "button";
        this.parent = parent;
        this.className = className;
        this.textContent = textContent;
    }
    eventListener(handler) {
        addEventListener("click", handler);
    }
}

export class ToDoCard extends Element {
    constructor() {
        super();
        this.elementName = "div";
        this.parent = ".todo-card-area"
        this.className = "todo-card";
        this.textContent = "";
    }
}