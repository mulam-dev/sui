import { make_interface } from "./interface/basic.js";
import { parse_trans_data_full } from "./protocol/json.js";
import { sign } from "./std/std.js";
import { Scope } from "./type/scope.js";

const root = new Scope();
sign(root);

const DEMO = {
    app_name: "Demo",
    monos: [{
        rel: "app",
        desc: "计算器",
        inner: [{
            rel: "calculate",
            desc: "计算",
            type: "core.method",
            inner: [{
                rel: "input",
                desc: "表达式",
                type: ".param",
                inner: [{
                    type: ".source",
                    stype: "ref",
                    src: "app.input",
                }],
            }],
        }, {
            rel: "input",
            desc: "表达式",
            type: "core.string",
            value: "0",
        }, {
            rel: "result",
            desc: "结果",
            type: "core.string",
            value: "0",
        }],
    }],
};

/*

// DSL 表示

app[计算器] {
    calculate[计算]: core.method {
        input[表达式]: .param {
            *:.source (
                stype = "ref"
                src = "app.input"
            )
        }
    }
    input[表达式]: core.string = "0"
    result[结果]: core.string = "0"
}

*/

const tdata = parse_trans_data_full(JSON.stringify(DEMO));

tdata.apply(root);

// const e_scope = document.getElementById("scope");
// for (const mono of root) {
//     const elem = document.createElement("div");
//     if (mono.type === "core.type" || mono.type === null) {
//         elem.textContent = mono.rel + (mono.type === null ? " <raw>" : '');
//     } else {
//         const ext_opts = {...mono, rel: null, type: null, desc: null, visible: null, _scope: null, _type: null};
//         const popts = [];
//         for (const key in ext_opts) {
//             const value = ext_opts[key];
//             if (value !== null)
//                 popts.push(key + " = " + JSON.stringify(ext_opts[key]));
//         }
//         elem.textContent = `${mono.rel}${(mono.desc ? `[${mono.desc}]` : '')}: ${(mono.type ?? "<raw>")}${(popts.length > 0 ? " (\n    " + popts.join('\n    ') + "\n)" : '')}`;
//     }
//     elem.classList.add("code");
//     if (!mono.visible) elem.classList.add("f-fade");
//     e_scope.append(elem, document.createElement("hr"));
// }

const ui = make_interface(root);
ui.append(document.body);