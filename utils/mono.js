import { Mono } from "../type/mono.js";

export function make_mono(opt) {
    const mono = new Mono();
    Object.assign(mono, opt);
    return mono;
}

export function make_std_mono(opt) {
    return make_mono({
        ...opt,
    });
}