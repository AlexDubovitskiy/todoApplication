import Model from './MVC/model';
import View from './MVC/view';
import Controller from './MVC/controller';

import { save, load } from './helpers';

const state = load();

const model = new Model(state || undefined);
model.on('change', state => save(state));

const view = new View();
const controller = new Controller(model, view);

