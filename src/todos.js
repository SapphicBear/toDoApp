import { format } from "date-fns";
export class ToDo {
    constructor(title, description, dueDate, importance) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.importance = importance;
        this.id = "";
    }
    creationDate = format(new Date(), "dd.MM.yyyy - kk:mm")
    delete = false;
    notes = [];
    checklist = [];
    project = [];


    setImportance() {
        if (this.importance == true) {
            this.importance = false;
        } else if (this.importance == false) {
            this.importance = true;
        } else {
            this.importance = false;
        }
    }
    setDelete() {
        if (this.delete == false) {
            this.delete = true;
        } else {
            this.delete = false;
        }
    }
    addNote(note) {
        this.notes.push(note);
    }
    removeNote(note) {
        if (!this.notes.includes(note) || this.notes == "") {
            throw new Error("Cannot remove a note, note does not exist!");
        } else {
            const index = this.notes.indexOf(note);
            this.notes.splice(index, 1);
        }
    }

    addCheckListItem(name) {
        let item = {};
        item.name = name;
        item.checked = false;
        item.delete = false;
        this.checklist.push({item});
    }

    markCheckListItemChecked(item) {
        if (item.checked == true) {
            item.checked = false;
        } else {
            item.checked = true;
        }
    }
    
    removeCheckListItem(item) {
        item.delete = true;
        this.checklist.splice(this.checklist.findIndex(item => item.delete == true), 1);
    }
}