import { CURRENCY_UNIT } from "../config";
import { View } from "./View";

class ExpenseTrackerView extends View {
    _container = document.querySelector(".expenses_container");
    _filterSelect = document.querySelector(".expense_filter");
    _totalBox = document.querySelector(".total_expense")

    addRenderHandler(handler) {
        this._body_container.addEventListener("StorageChange", handler.bind(this))
    }

    generateHTMLString() {
        let html = `<div style="overflow=auto;width=100%;height=100%">`;
        if (Array.isArray(this.data)) {
            this.data.forEach(el => {
                html += `
                <div class="card transaction_card" style="display:flex; justify-content:space-between">
                <div class="red" style="font-weight:bolder;"> - ${el._value} ${CURRENCY_UNIT}</div>
                <div>${this.#getDateByTimeStamp(el.timestamp)}</div>
               </div>
                `
            })
        }
        html += '</div>';
        return html;
    }

    #getDateByTimeStamp(timestamp) {
        let date = new Date(timestamp);
        return date.toDateString();
    }
};

export default new ExpenseTrackerView();