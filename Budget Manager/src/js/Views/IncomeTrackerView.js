import { ListView } from "./ListView";

class IncomeTrackerView extends ListView {
    _container = document.querySelector(".income_container");
    _filterSelect = document.querySelector(".income_filter")
};

export default new IncomeTrackerView();