import { Transaction, transactionType } from "./model";
import { AddTransactionView, ShowBalanceView, ExpenseTrackerView, IncomeTrackerView } from "./Views"


const getTransactionsFromLS = (type) => {
    return JSON.parse(localStorage.getItem(type) || '[]')
}

const saveTransactionInLS = (type, transaction) => {
    let list = getTransactionsFromLS(type);
    list.push(transaction);
    list = JSON.stringify(list);
    localStorage.setItem(type, list);
}

const controlAddTransaction = (event) => {
    event.preventDefault();
    let { amount, type } = AddTransactionView;
    console.log(amount, type)
    const transaction = new Transaction(type, amount);
    saveTransactionInLS(type, transaction);
    AddTransactionView.clearForm();
}



const controlShowBalance = () => {
    console.log("StorageChangeListener triggered");
    const income = getTransactionsFromLS(transactionType.INCOME);
    const expense = getTransactionsFromLS(transactionType.EXPENSE);
    ShowBalanceView.render({
        income,
        expense
    })
};

const controlUpdateExpenseList = (ev) => {
    if (ev.detail.type === transactionType.EXPENSE)
        ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE))
};

const controlUpdateIncomeList = (ev) => {
    if (ev.detail.type === transactionType.INCOME)
        IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME))
};


const compareAmountFn = (a, b, flag) => {
    if (flag) {
        if (a._value < b._value) {
            return -1;
        }
        if (a._value > b._value) {
            return 1;
        }
        // a must be equal to b
        return 0;

    } else {
        if (a._value > b._value) {
            return -1;
        }
        if (a._value < b._value) {
            return 1;
        }
        // a must be equal to b
        return 0;
    }
}
const controlSortByAmount = (list, view, flag, shouldReverse) => {
    if (Array.isArray(list)) {
        list.sort((a, b) => compareAmountFn(a, b, flag));
        console.log("sorted list is", list)
        if (shouldReverse) list = list.reverse()
        view.render(list);
    }
};

const controlFilterChange = (ev) => {
    console.log(ev.target.value)
    if (ev.target.id === "income_filter") {
        if (ev.target.value === "Amount+") {
            controlSortByAmount(getTransactionsFromLS(transactionType.INCOME),
                IncomeTrackerView, false)
        }

        if (ev.target.value === "Amount-") {
            controlSortByAmount(getTransactionsFromLS(transactionType.INCOME),
                IncomeTrackerView, true)
        }

        if (ev.target.value === "none") {
            IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME));
        }
    } else {
        if (ev.target.value === "Amount+") {
            controlSortByAmount(getTransactionsFromLS(transactionType.EXPENSE),
                ExpenseTrackerView, false, true)
        }

        if (ev.target.value === "Amount-") {
            controlSortByAmount(getTransactionsFromLS(transactionType.EXPENSE),
                ExpenseTrackerView, true, true)
        }

        if (ev.target.value === "none") {
            ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE));
        }
    }

}

const init = () => {
    AddTransactionView.addSubmitHandler(controlAddTransaction);
    ShowBalanceView.addRenderListnerHandler(controlShowBalance)
    controlShowBalance();
    ExpenseTrackerView.addRenderHandler(controlUpdateExpenseList)
    ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE))
    IncomeTrackerView.addRenderHandler(controlUpdateIncomeList)
    IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME))
    IncomeTrackerView.addFilterEventHandler(controlFilterChange)
    ExpenseTrackerView.addFilterEventHandler(controlFilterChange)
};
init();
