export const Elem = (name) => document.createElement(name);
export const Div = (classes = [], ...children) => {
    const elem = Elem("div");
    if (classes.length) elem.classList.add(...classes);
    elem.append(...children);
    return elem;
};
export const Input = (type, classes = [], attrs = {}) => {
    const elem = Elem("input");
    elem.type = type;
    for (const key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
    elem.classList.add(...classes);
    return elem;
};