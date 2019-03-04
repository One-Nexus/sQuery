import getNamespace from './getNamespace';
import getComponents from './getComponents';
import isComponent from './isComponent';

export default function component(node, componentName, operator, config) {
    config = config || this;

    let namespace = node => config.namespace || getNamespace(node, false, config);

    const { componentGlue } = config;

    if (!componentName && !operator) {
        return getComponents(node, false, config);
    }

    if (!operator || operator === 'find') {
        return getComponents(node, componentName, config);
    }

    if (operator === 'is') {
        return isComponent(node, componentName, config);
    }

    if (operator === 'set') {
        if (node instanceof NodeList) {
            node.forEach(node => node.classList.add(namespace(node) + componentGlue + componentName));
        } else {
            node.classList.add(namespace(node) + componentGlue + componentName);
        }
    }

    if (operator === 'unset') {
        if (node instanceof NodeList) {
            node.forEach(node => node.classList.remove(namespace(node) + componentGlue + componentName));
        } else {
            node.classList.remove(namespace(node) + componentGlue + componentName);
        }
    }

    if (typeof operator === 'function') {
        getComponents(node, componentName, config).forEach(node => operator(node));
    }
}