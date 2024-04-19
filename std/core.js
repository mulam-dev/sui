import { make_std_mono } from "../utils/mono.js";

export function sign(scope) {
    // Core Types
    scope.add(make_std_mono({
        rel: "core.type",
        _type: {
            //
        }
    }));

    // Basic Types
    scope.add(make_std_mono({
        rel: "core.collect",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.method",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.method.param",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.method.param.source",
        type: "core.type",
    }));

    // Primary Types
    scope.add(make_std_mono({
        rel: "core.string",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.number",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.bool",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.list",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.struct",
        type: "core.type",
    }));
    scope.add(make_std_mono({
        rel: "core.kvlist",
        type: "core.type",
    }));
}