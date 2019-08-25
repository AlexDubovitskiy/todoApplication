function createElement(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach(key => {
        if (key.startsWith('data-')) {
            element.setAttribute(key, props[key]);
        } else {
            element[key] = props[key];
        }
    });

    children.forEach(child => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);
    });

    return element;
}

class EventEmitter { // c 01:06
    constructor() {
        this.events = {};
    }

    on(type, listener) {
        /**если доступ к объекту что то вернет, то мы присваиваем -
         this.events[type], в противном случае мы укажем пустой массив*/
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(function (listener) {
                return listener(arg)
            });
        }
    }
}

function save(data) {
    const string = JSON.stringify(data);

    localStorage.setItem('todos', string);
}

function load() {
    const string = localStorage.getItem('todos');
    const data = JSON.parse(string);

    return data;
}

export {createElement, EventEmitter, save, load};