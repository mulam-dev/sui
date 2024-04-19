export class Interface {
    scope;
    view;
    _inited = false;
    constructor(scope) {
        this.scope = scope;
    }
    _init() {
        if (!this._inited) {
            this._init = true;
            return true;
        } else
            return false;
    }
    append(elem_id) {
        if (typeof elem_id === "string") elem_id = document.getElementById(elem_id);
        this._init();
        elem_id.append(this.view);
    }
}