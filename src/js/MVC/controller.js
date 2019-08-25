class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        view.on('add', this.addTodo.bind(this));
        view.on('toggle', this.toggleTodo.bind(this));
        view.on('edit', this.editTodo.bind(this));
        view.on('remove', this.removeTodo.bind(this));

        view.show(model.items);
    }

    addTodo(title) {
        /**модель созадет новый объект*/
        const item = this.model.addItem({
            id       : Date.now(),
            title,
            completed: false
        });

        this.view.addItem(item); /** передаем представлению item, посредством метода addItem*/
    }

    toggleTodo({id, completed}) {
        /** "{id, completed}" - объект*/
        const item = this.model.updateItem(id, {completed});

        this.view.toggleItem(item);
    }

    editTodo({id, title}) {
        const item = this.model.updateItem(id, {title});

        this.view.editItem( item);
    }

    removeTodo(id) {
        this.model.removeItem(id);
        this.view.removeItem(id);
    }
}

export default Controller;