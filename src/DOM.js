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
    makeElementID() {
        document.querySelector(this.parent).appendChild(document.createElement(this.elementName)).setAttribute("id", `${this.className}`)
        if (this.textContent == undefined || this.textContent == null) {
            this.textContent = "";
        } 
            document.getElementByID(this.className).textContent = this.textContent;
    }

    editTextContent(textContent) {
        this.textContent = textContent;
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

export class Checkbox extends Element {
    constructor(parent, className) {
        super();
        this.elementName = "input"
        this.parent = parent;
        this.className = className;
        this.style = "type", "checkbox";
    }
}