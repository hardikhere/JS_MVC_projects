class searchVeiw {
    searchInput = document.querySelector("#search_input");
    _searchBtn = document.querySelector("#search_btn");
    _clearBtn = document.querySelector("#search_btn_clear");
    constructor() {
        this._searchBtn.addEventListener("click", this.handleSearch.bind(this))
        this._clearBtn.addEventListener("click", this._clearSearchQuery.bind(this))
    }

    handleSearch() {
        const q = this.getQuery();
        window.location.hash = `s=${q}`;
        this.toggleButtons()
    }
    getQuery() {
        const query = this.searchInput.value;
        return query;
    }
    toggleButtons() {
        this._clearBtn.classList.toggle("remove");
        this._searchBtn.classList.toggle("remove");
    }
    _clearSearchQuery() {
        this.searchInput.value = '';
        window.location.hash = "";
        this.toggleButtons();
    }
};

export default new searchVeiw();