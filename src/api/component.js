import getModuleNamespace from '../utilities/getModuleNamespace';
import getComponents from '../utilities/getComponents';

import isComponent from './isComponent';

/**
 * @param {String} componentName 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */
export default function component(componentName, operator) {
    if (!componentName && !operator) {
        return getComponents(this);
    }

    if (!operator || operator === 'find') {
        return getComponents(this, componentName);
    }

    if (operator === 'is') {
        return isComponent.bind(this)(componentName);
    }

    if (operator === 'set') {
        this.DOMNodes.forEach(node => node.classList.add(this.namespace || getModuleNamespace(node) + this.componentGlue + componentName));
    }

    if (operator === 'unset') {
        this.DOMNodes.forEach(node => node.classList.remove(this.namespace || getModuleNamespace(node)));
    }

    if (typeof operator === 'function') {
        this.DOMNodes.forEach(node => operator(node));
    }
}