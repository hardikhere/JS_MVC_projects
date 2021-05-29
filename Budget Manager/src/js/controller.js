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
    const { amount, type } = AddTransactionView;
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
}

const init = () => {
    AddTransactionView.addSubmitHandler(controlAddTransaction);
    ShowBalanceView.addRenderListnerHandler(controlShowBalance)
    controlShowBalance();
    ExpenseTrackerView.addRenderHandler(controlUpdateExpenseList)
    ExpenseTrackerView.render(getTransactionsFromLS(transactionType.EXPENSE))
    IncomeTrackerView.addRenderHandler(controlUpdateIncomeList)
    IncomeTrackerView.render(getTransactionsFromLS(transactionType.INCOME))
};
init();
