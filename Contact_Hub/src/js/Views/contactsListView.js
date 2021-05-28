class contactListsView {
    _parentElement = document.querySelector(".contact_lists_container");

    render(data) {
        this._data = data;
        let htmlString = this._generateHTMLString();
        this._parentElement.firstElementChild.innerHTML = htmlString;
    }

    _generateHTMLString() {
        let html = `<ul class="flex col">`;
        if (Array.isArray(this._data)) {
            this._data.forEach(contact => {
                html += `<li class="person_card">
                <div class="user_icon"></div>
                <div class="flex col person_card_details">
                  <b>${contact.name}</b> 
                  <div>${contact.phone}</div>
                </div>
                </li>`;
            })
            html += "</ul>";
        } else throw TypeError("Data for ContactListView must be an array")
        return html;
    }
};

export default new contactListsView();