import { CURRENCY_UNIT } from "../config";


export class ListView {
    render(data) {
        this.data = data;
        const html = this.generateHTMLString();
        this._container.innerHTML = html;
    }
    addFilterEventHandler(handler) {
        this._filterSelect.addEventListener("change", (e) => {
            handler(e)
        })
    }

    pushTransactionCard(transaction) {
        this._container.insertAdjacentHTML("afterbegin", this.getCardHTMLString(transaction))
    }

    getCardHTMLString(el) {
        return ` <div class="card transaction_card" style="display:flex; justify-content:space-between">
        <div class=${el._type === "EXPENSE" ? "red" : "green"}
         style="font-weight:bolder;"> - ${el._value} ${CURRENCY_UNIT}</div>
        <div>${this.#getDateByTimeStamp(el.timestamp)}</div>
      </div>`
    }

    generateHTMLString() {
        let html = "";
        if (Array.isArray(this.data)) {
            this.data.forEach(el => {
                html += this.getCardHTMLString(el);
            })
        }
        return html;
    }

    #getDateByTimeStamp(timestamp) {
        let date = new Date(timestamp);
        return date.toDateString();
    }

}