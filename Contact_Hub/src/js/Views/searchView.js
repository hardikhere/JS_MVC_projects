class searchVeiw {
    searchInput = document.querySelector("#search_input");
    _searchBtn = document.querySelector("#search_btn");
    _clearBtn = document.querySelector("#search_btn_clear");
    addSearchHandler(handler) {
        this._searchBtn.addEventListener("click", handler.bind(this))
    }

    addClearSearchHandler(handler) {
        this._clearBtn.addEventListener("click", handler.bind(this))
    }

    getQuery() {
        const query = this.searchInput.value;
        return query;
    }
    toggleButtons() {
        this._clearBtn.classList.toggle("remove");
        this._searchBtn.classList.toggle("remove");
    }

};

export default new searchVeiw();