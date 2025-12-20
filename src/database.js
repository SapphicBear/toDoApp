export const dataBase = {
    saveData(name, obj) {
    localStorage.setItem(name, JSON.stringify(obj));
},
    deleteData(name) {
        localStorage.removeItem(name);
    },

    overrideData(name, obj) {
        let keys = this.checkData();
        for (let i = 0; i < keys.length; i++) {
            console.log(keys)
            console.log(name)
            if (keys[i] == name) {
                console.log("found")
                this.deleteData(keys[i]);
                this.saveData(name, obj)
            }
        }
    },


    checkData() {
        const allKeys = Object.keys(localStorage);
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