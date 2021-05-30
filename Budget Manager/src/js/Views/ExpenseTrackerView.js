import { CURRENCY_UNIT } from "../config";
import { ListView } from "./ListView";

class ExpenseTrackerView extends ListView {
    _container = document.querySelector(".expenses_container")
    _filterSelect = document.querySelector(".expense_filter");  
};

export default new ExpenseTrackerView();