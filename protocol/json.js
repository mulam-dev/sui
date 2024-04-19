import { Mono } from "../type/mono.js";
import { TransDataFull } from "./type.js";

export function parse_trans_data_full(data) {
    const result = new TransDataFull();
    function _parse(rmonos, prel = [], ptype = []) {
        return rmonos.flatMap(rmono => {
            const crel = prel.concat(rmono.rel ?? '*');
            const ctype =
                rmono.type ?
                    rmono.type.startsWith('.') ?
                        ptype.concat(rmono.type.slice(1)).join('.') :
                        rmono.type :
                    "core.collect";
            const mono = new Mono();
            Object.assign(mono, {visible: true}, rmono, {rel: crel.join('.'), type: ctype});
            if (rmono.inner instanceof Array) {
                delete mono.inner;
                return [mono].concat(_parse(rmono.inner, crel, [ctype]));
            } else
                return [mono];
        });
    }
    const jdata = JSON.parse(data);
    result.app_name = jdata.app_name;
    result.monos = _parse(jdata.monos);
    return result;
}