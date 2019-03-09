import getComponents from './getComponents';
import getComponent from './getComponent';
import setComponent from './setComponent';
import unsetComponent from './unsetComponent';
import isComponent from './isComponent';

export default function component(node, componentName, operator, config) {
    config = config || this;

    if (!componentName && !operator) {
        return (config.getSubComponents || getComponents)(node, false, config);
    }

    if (!operator || operator === 'find') {
        return (config.getSubComponents || getComponents)(node, componentName, config);
    }

    if (operator === 'first') {
        return (config.getSubComponent || getComponent)(node, componentName, config);
    }

    if (operator === 'is') {
        return isComponent(node, componentName, config);
    }

    if (operator === 'set') {
        //@TODO setSubComponent

        return setComponent(node, componentName, null, null, config);
    }

    if (operator === 'unset') {
        //@TODO unsetSubComponent
    
        return unsetComponent(node, componentName, config);
    }

    if (typeof operator === 'function') {
        return getComponents(node, componentName, config).forEach(node => operator(node));
    }
}