import { ContactPerson } from "./model";
import { addContactView, contactListView } from "./Views";

const getContactListsFromLS = () => {
    let list = localStorage.getItem("mylist") || '[]';
    return JSON.parse(list);
}

const controlAddContact = (e) => {
    e.preventDefault();
    const { contactName, contactPhone } = addContactView;
    const newContact = new ContactPerson(contactName.value, contactPhone.value);
    newContact.saveContactInLs();
    contactListView.render(getContactListsFromLS());
    addContactView.clearForm();
};

const getSearchResults = (query) => {
    let list = getContactListsFromLS();
    if (Array.isArray(list)) {
        list = list.filter(el => {
            if (el.name.includes(query) ||
                el.phone.toString().includes(query)) return true;
            else return false;
        })
    }
    return list;
}

const controlSearch = () => {
    let query = location.hash.split("=")[1];
    let results = getSearchResults(query);
    if (!!query) {
        contactListView.render(results);
    } else {
        contactListView.render(getContactListsFromLS());
    }
}

function init() {
    addContactView.addFormSubmitHandler(controlAddContact)
    contactListView.render(getContactListsFromLS())
    window.onhashchange = controlSearch;
};

init();