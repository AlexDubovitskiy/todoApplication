import {EventEmitter} from '../helpers.js';

class Model extends EventEmitter {
    constructor(items = []) {
        super();

        this.items = items;
    }

    getItem(id) {
        return this.items.find(function (item) {
            return item.id == id;
        });
    }

    /**Метод find() возвращает значение первого найденного в массиве элемента,
     *которое удовлетворяет условию переданному в callback функции.
     *В противном случае возвращается undefined.
     */

    addItem(item) {
        this.items.push(item);
        this.emit('change', this.items); /**Фиксация изменений для localStorage*/
        return item;
    }

    updateItem(id, data) {
        const item = this.getItem(id);
        /**Метод Object.keys() возвращает массив из собственных перечисляемых свойств переданного объекта*/
        Object.keys(data).forEach(function (prop) {
            /**item[prop] - свойство объекта(с использованием скобочной записи)*/
            return item[prop] = data[prop]
        });

        this.emit('change', this.items);/**Фиксация изменений для localStorage*/

        return item;
    }

    removeItem(id) {
        /**Метод findIndex() возвращает индекс в массиве, если элемент удовлетворяет условию проверяющей функции.
         * В противном случае возвращается -1.*/
        const index = this.items.findIndex(function (item)  {
            return item.id == id
        });

        if (index > -1) {
            this.items.splice(index, 1);
            this.emit('change', this.items);/**Фиксация изменений для localStorage*/
        }
    }
}

export default Model;