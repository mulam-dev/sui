import { Div, Elem, Input } from "../utils/dom.js";
import { Interface } from "./type.js";

export function make_interface(scope) {
    return new BasicInterface(scope);
}

class BasicInterface extends Interface {
    _init() {
        if (super._init())
            this.view = make_root_view(this.scope);
    }
}

function make_root_view(scope) {
    const vcollect = scope.visible();
    const root_views = vcollect.roots().flatMap(mono => make_view(scope, vcollect, mono));
    const cont = Div(["ui-root"], ...root_views);
    return cont;
}

function make_view(scope, vcollect, mono, parent = null) {
    const adapter = ADAPTERS[mono.type];
    if (adapter)
        return adapter(scope, vcollect, mono, parent);
    else
        return []
}

const group_monos = monos => {
    const rest = [];
    const methods = [];
    for (const mono of monos) {
        if (mono.type === "core.method")
            methods.push(mono);
        else
            rest.push(mono);
    }
    return {rest, methods};
};

const ADAPTERS = {
    "core.collect": (scope, vcollect, mono, parent) => {
        const lower_views = vcollect.lower(mono.rel);
        const lower_sets = group_monos(lower_views);
        const inner = Div(["ui-core-collect-inner"]);
        const cont = Div(["ui-core-collect"]);
        if (mono.desc) cont.append(Div(["ui-core-collect-label"], mono.desc));
        inner.append(...lower_sets.rest.flatMap(mono => make_view(scope, vcollect, mono)));
        cont.append(inner);
        if (lower_sets.methods.length)
            cont.append(Div(["ui-core-collect-methods"], ...lower_sets.methods.flatMap(mono => make_view(scope, vcollect, mono))));
        return [cont];
    },
    "core.number": (scope, vcollect, mono, parent) => {
        const cont = Div(["ui-core-number"], Div(["ui-core-number-label"], mono.desc ?? mono.rel.split('.').at(-1)));
        return [cont];
    },
    "core.string": (scope, vcollect, mono, parent) => {
        const input = Input("text", ["ui-core-string-input"], {value: mono.value});
        const cont = Div(["ui-core-string"],
            Div(["ui-core-string-label"], mono.desc ?? mono.rel.split('.').at(-1)),
            input,
        );
        return [cont];
    },
    "core.method": (scope, vcollect, mono, parent) => {
        const input = Input("button", ["ui-core-method"], {value: mono.desc ?? mono.rel.split('.').at(-1)});
        return [input];
    },
};