import { CURRENCY_UNIT } from "../config";

class IncomeTrackerView {
    _container = document.querySelector(".income_container");
    _body_container = document.querySelector(".body_container")
    render(data) {
        this.data = data;
        const html = this.#generateHTMLString();
        this._container.innerHTML = html;
    }

    addRenderHandler(handler) {
        this._body_container.addEventListener("StorageChange", handler.bind(this))
    }

    #generateHTMLString() {
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

    #getDateByTimeStamp(timestamp){
        let date =  new Date(timestamp);
        return date.toDateString();
    }
};

export default new IncomeTrackerView();