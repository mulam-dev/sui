export class Collection {
    mono_map = new Map();
    constructor(monos = []) {
        for (const mono of monos)
            this.add(mono);
    }

    // Set Opts
    add(...monos) {
        for (const mono of monos) {
            const rel = mono.rel;
            let entries = [];
            if (!this.mono_map.has(rel))
                this.mono_map.set(rel, entries);
            else
                entries = this.mono_map.get(rel);
            entries.push(mono);
        }
    }
    del(...monos) {
        for (const mono of monos) {
            const rel = mono.rel;
            const entries = this.mono_map.get(rel);
            entries.splice(entries.indexOf(mono), 1);
            if (entries.length === 0) this.mono_map.delete(rel);
        }
    }
    filter(handle) {
        const values = this.mono_map.values();
        return (function* () {
            for (const entries of values)
                for (const mono of entries)
                    if (handle(mono)) yield mono;
        })();
    }
    map(handle) {
        const values = this.mono_map.values();
        return (function* () {
            for (const entries of values)
                for (const mono of entries)
                    yield handle(mono);
        })();
    }
    flatMap(handle) {
        const values = this.mono_map.values();
        return (function* () {
            for (const entries of values)
                for (const mono of entries)
                    for (const res of handle(mono))
                        yield res;
        })();
    }
    reduce(...args) {
        return [...this.monos()].reduce(...args);
    }
    monos() {
        const values = this.mono_map.values();
        return (function* () {
            for (const entries of values)
                for (const mono of entries)
                    yield mono;
        })();
    }
    [Symbol.iterator]() {
        return this.monos();
    }

    // Map Opts
    get(rel) {
        return this.mono_map.get(rel) ?? [];
    }
    pick(rel) {
        return this.mono_map.get(rel)?.[0] ?? null;
    }

    // Filter Opts
    select(handle) {
        return new Collection(this.filter(handle));
    }
    visible() {
        return this.select(mono => mono.visible);
    }
    roots(rel = '') {
        if (rel !== '') rel += '.';
        let root_rels = [];
        for (const crel of this.mono_map.keys())
            if (crel.startsWith(rel) && root_rels.every(root_rel => !crel.startsWith(root_rel + '.')))
                root_rels = root_rels.filter(root_rel => !root_rel.startsWith(crel + '.')).concat([crel]);
        const ncollect = new Collection();
        ncollect.mono_map = new Map([...this.mono_map].filter(([rel]) => root_rels.includes(rel)));
        return ncollect;
    }
    inner(rel) {
        const srel = rel + '.';
        const rels = [...this.mono_map.keys()].filter(crel => crel.startsWith(srel) && !crel.includes('.', srel.length));
        const ncollect = new Collection();
        ncollect.mono_map = new Map([...this.mono_map].filter(([rel]) => rels.includes(rel)));
        return ncollect;
    }
    lower(rel) {
        const srel = rel + '.';
        let rels = [...this.mono_map.keys()].filter(crel => crel.startsWith(srel));
        rels = rels.filter(rel => rels.every(r => !rel.startsWith(r + '.')));
        const ncollect = new Collection();
        ncollect.mono_map = new Map([...this.mono_map].filter(([rel]) => rels.includes(rel)));
        return ncollect;
    }
    collect(rel) {
        const srel = rel + '.';
        const rels = [...this.mono_map.keys()].filter(crel => crel.startsWith(srel)).concat(rel);
        const ncollect = new Collection();
        ncollect.mono_map = new Map([...this.mono_map].filter(([rel]) => rels.includes(rel)));
        return ncollect;
    }
    contain(rel) {
        const srel = rel + '.';
        const rels = [...this.mono_map.keys()].filter(crel => crel.startsWith(srel));
        const ncollect = new Collection();
        ncollect.mono_map = new Map([...this.mono_map].filter(([rel]) => rels.includes(rel)));
        return ncollect;
    }
}