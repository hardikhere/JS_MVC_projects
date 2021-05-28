

class contactListsView {
    _parentElement = document.querySelector(".contact_lists_container");

    render(data) {
        this._data = data;
        let PersonCards = this._generatePersonCards();
        this._parentElement.replaceChild(PersonCards, this._parentElement.firstChild)
    };

    _generatePersonCards() {
        let list = document.createElement("ul");
        list.style.overflow = "auto"
        list.style.height = "100%";
        list.style.width = "100%";
        list.classList.add("flex", "col");
        if (Array.isArray(this._data)) {
            this._data.forEach(contact => {
                let personCard = this._getPersonCardElement(contact);
                list.appendChild(personCard);
            })
        } else throw TypeError("Data for ContactListView must be an array")
        return list;
    };

    addDeleteCardEventListener(handler) {
        this.onDelete = handler;
    }

    _getPersonCardElement(contact) {
        const name = contact.name;
        const phone = contact.phone;
        const id = contact.id;
        let element = document.createElement("li");
        element.classList.add("person_card");
        element.innerHTML = `
        <div class="user_icon"></div>
        <div class="flex col person_card_details">
          <b>${name}</b> 
          <div>${phone}</div>
        </div>`;
        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete_btn");
        deleteBtn.textContent = "Delete"
        deleteBtn.classList.toggle("hidden");
        deleteBtn.style.marginLeft = "auto"
        deleteBtn.addEventListener("click", this.onDelete.bind(this, id));
        element.append(deleteBtn);
        element.addEventListener("mouseover", this.toggleShowOptions.bind(this, deleteBtn));
        element.addEventListener("mouseout", this.toggleShowOptions.bind(this, deleteBtn));
        return element;
    }

    toggleShowOptions(element) {
        element.classList.toggle("hidden")
    };
};

export default new contactListsView();