export class View {
    _data;
    _container;
    _body_container = document.querySelector(".body_container");;
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
    addRenderHandler(handler) {
        this._body_container.addEventListener("StorageChange", handler.bind(this))
    }

}