import { Collection } from "./collection.js";

export class Scope extends Collection {
    add(...monos) {
        for (const mono of monos) {
            mono._scope = this;
            if (mono.type !== null) mono._type = this.pick(mono.type);
            super.add(mono);
        }
    }
    del(...monos) {
        for (const mono of monos) {
            mono._scope = null;
            if (mono.type !== null) mono._type = null;
            super.del(mono);
        }
    }
    mov(mono, rel) {
        super.del(mono);
        mono.rel = rel;
        super.add(mono);
    }
}