import { CURRENCY_UNIT } from "../config";
import { View } from "./View";

class IncomeTrackerView extends View {
    _container = document.querySelector(".income_container");
    _filterSelect = document.querySelector(".income_filter")
    _totalBox = document.querySelector(".total_income")

    generateHTMLString() {
        let html = `<div style="overflow=auto;width=100%;height=100%">`;
        if (Array.isArray(this.data)) {
            this.data.forEach(el => {
                html += `
                <div class="card transaction_card" style="display:flex; justify-content:space-between">
                 <div class="green" style="font-weight:bolder;"> + ${el._value} ${CURRENCY_UNIT}</div>
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

export default new IncomeTrackerView();