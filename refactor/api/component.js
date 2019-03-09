import getComponents from './getComponents';
import isComponent from './isComponent';
import setComponent from './setComponent';
import unsetComponent from './unsetComponent';
import getComponent from './getComponent';

export default function component(node, componentName, operator, config) {
    config = config || this;

    if (!componentName && !operator) {
        return getComponents(node, false, config);
    }

    if (!operator || operator === 'find') {
        return getComponents(node, componentName, config);
    }

    if (operator === 'first') {
        return getComponent(node, componentName, config);
    }

    if (operator === 'is') {
        return isComponent(node, componentName, config);
    }

    if (operator === 'set') {
        return setComponent(node, componentName, null, null, config);
    }

    if (operator === 'unset') {
        return unsetComponent(node, componentName, config);
    }

    if (typeof operator === 'function') {
        return getComponents(node, componentName, config).forEach(node => operator(node));
    }
}