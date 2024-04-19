export class Mono {
    rel = "*";
    desc = "";
    type = null;
    visible = false;

    _scope = null;
    _type = null;

    inner() {
        return this._scope.inner(this.rel);
    }
    lower() {
        return this._scope.lower(this.rel);
    }
    contain() {
        return this._scope.contain(this.rel);
    }
    collect() {
        return this._scope.collect(this.rel);
    }
}