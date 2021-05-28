export var state = {
    isSearching: false
}



export class ContactPerson {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
        this.id = `${name}-${phone}`;
    }

    saveContactInLs() {
        const contact = {
            name: this.name,
            phone: this.phone,
            id: this.id
        };
        let mylist = localStorage.getItem("mylist");
        if (!mylist) {
            localStorage.setItem("mylist", JSON.stringify([contact]));
            return;
        }
        else {
            mylist = JSON.parse(mylist);
            if (Array.isArray(mylist)) {
                mylist.push(contact);
            }
            localStorage.setItem("mylist", JSON.stringify(mylist));
        }
    }
}