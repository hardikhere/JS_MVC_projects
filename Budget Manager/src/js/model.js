export const transactionType = {
    INCOME: "INCOME",
    EXPENSE: "EXPENSE"
};

export class Transaction {
    #secret = `adsad${Math.random() * 100}`;

    constructor(type, value) {
        if (typeof value !== "number" || isNaN(value))
            throw new TypeError("value must be number")
        if (!(type in transactionType))
            throw new Error("type must be INCOME or EXPENSE only");
        this._type = type;
        this._value = value;
        this.id = `${type}-${value}-${this.#secret}`;
        this.timestamp = Date.now();
    }
};

