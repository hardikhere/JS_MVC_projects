
class AddTransactionView {
    _form = document.querySelector(".add_transaction_form");
    _amount = this._form.querySelector(".amount")
    _type = this._form.querySelector(".transaction_type")
    addSubmitHandler(handler) {
        const self = this;
        this._form.addEventListener("submit", (e) => {
            handler(e);
            self.clearForm();
        });
    }

    clearForm() {
        this._amount.value = "";
    }

    get amount() {
        return parseFloat(this._amount.value);
    }

    get type() {
        return this._type.value;
    }
}

export default new AddTransactionView();