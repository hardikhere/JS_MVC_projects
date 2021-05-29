import { CURRENCY_UNIT } from "../config";

class ShowBalanceView {
    _parentElement = document.querySelector(".add_transaction_container");
    _container = this._parentElement.querySelector(".balance_container");
    render(data) {
        this.data = data;
        const balance = this.getTotalBalance();
        console.log("balance is ", this.balance)
        this._container.innerHTML = this.#generateHTMLString();
    };

    addRenderListnerHandler(handler) {
        this._parentElement.addEventListener("StorageChange", handler.bind(this));
    }

    #generateHTMLString() {
        return `
        <div style="display:flex;flex-direction:column;align-items:center;"> 
            <h5>Your Balance</h5>
           <div class="balance bold ${this.balance > 0 ? "green" : "red"}">
             ${CURRENCY_UNIT} ${this.getFormatedBalance()}
           </div>
        </div>
        `
    };

    getTotalBalance() {
        let totalIncome = 0;
        this.data.income.forEach(inc => {
            totalIncome += inc._value;
        });
        let totalExpense = 0;
        this.data.expense.forEach(exp => {
            totalExpense += exp._value
        });
        this.balance = totalIncome - totalExpense;
    };

    getFormatedBalance() {
        return Number(parseFloat(this.balance).toFixed(2)).toLocaleString('en', {
            minimumFractionDigits: 2
        })
    }
};

export default new ShowBalanceView();