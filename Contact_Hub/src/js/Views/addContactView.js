class AddContactFormView {
    parentElement = document.querySelector(".add_contact_form");
    addContactBtn = document.querySelector(".add_contact_btn");
    contactName = document.querySelector("#contact_name");
    contactPhone = document.querySelector("#contact_phone");
    modal = document.querySelector(".add_contact_modal");
    close = document.querySelector(".add_contact_modal_close");
    errors = [];

    constructor() {
        this.addHandlerShowView();
        this.close.addEventListener("click", this.toggleView.bind(this))
    }

    addHandlerShowView() {
        this.addContactBtn.addEventListener("click", this.toggleView.bind(this))
    }

    toggleView(e) {
        e.preventDefault();
        this.errors = [];
        console.log("going to toggle")
        this.modal.classList.toggle("hidden");
    }

    addFormSubmitHandler(handler) {
        this.parentElement.addEventListener("submit", (e) => {
            e.preventDefault()
            let errs = this.checkErrors()
            if (errs.length !== 0) {
                this._showError(errs);
                return;
            }
            if (typeof handler === "function") {
                handler(e);
                this.toggleView(e);
            }
        });
    }

    clearForm() {
        console.log(this.parentElement)
        this.parentElement.querySelector("#contact_name").value = "";
        this.parentElement.querySelector("#contact_phone").value = "";
    }

    checkErrors() {
        let errors = [];
        if (this.contactName.value?.length < 2) {
            errors.push("Name must be atleast 3 characters long")
        }
        else if (this.contactName.value?.length > 30) errors.push("Too long Name")

        if (this.contactPhone.value?.length !== 10) {
            errors.push("Incorrect phone no. length")
        }
        this.errors = errors;
        return errors;
    }

    _showError(errs) {
        let errHTML = `<div class="error">Error : <ul>`;
        errs.forEach(err => {
            errHTML += `<li>${err}</li>`
        });
        errHTML += `</ul></div>`;
        this.parentElement.insertAdjacentHTML("afterbegin", errHTML)
    }
};

export default new AddContactFormView();