import isModule from './isModule';
import getModules from './getModules';

export default function module(node, moduleName, operator, config) {
    config = Object.assign(this || {}, config || {});

    if (!operator || operator === 'find') {
        return getModules(node, moduleName, config);
    }

    if (operator === 'is') {
        return isModule(node, moduleName, config);
    }

    if (typeof operator === 'function') {
        return getModules(node, moduleName, config).forEach(node => operator(node));
    }
}