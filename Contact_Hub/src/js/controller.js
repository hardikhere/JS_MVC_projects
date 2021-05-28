import { ContactPerson, state } from "./model";
import { addContactView, contactListView, searchView } from "./Views";

const getContactListsFromLS = () => {
    let list = localStorage.getItem("mylist") || '[]';
    return JSON.parse(list);
};

const updateListInLS = (list) => {
    localStorage.setItem("mylist", JSON.stringify(list))
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
    console.log("result is ", results);
    if (!!query) {
        contactListView.render(results);
    } else {
        contactListView.render(getContactListsFromLS());
    }
};

const deletePersonContact = (id) => {
    console.log("going to delete ", id)
    let list = getContactListsFromLS();
    list = list.filter(el => {
        return el.id === id ? false : true;
    })
    updateListInLS(list);
    contactListView.render(list);
    if (state.isSearching)
        clearSearchQuery();
};


const handleSearch = () => {
    state.isSearching = true;
    const q = searchView.getQuery();
    window.location.hash = `s=${q}`;
    searchView.toggleButtons()
}
const clearSearchQuery = () => {
    state.isSearching = false;
    searchView.searchInput.value = '';
    window.location.hash = "";
    searchView.toggleButtons();
};


const insertExampleContact = () => {
    const newContact = new ContactPerson("Mr. bob", 1234567890);
    newContact.saveContactInLs();
    contactListView.render(getContactListsFromLS());
}

function init() {
    addContactView.addFormSubmitHandler(controlAddContact)
    contactListView.addDeleteCardEventListener(deletePersonContact);
    contactListView.render(getContactListsFromLS());
    searchView.addSearchHandler(handleSearch);
    searchView.addClearSearchHandler(clearSearchQuery);
    window.onhashchange = controlSearch;
    insertExampleContact();
};

init();