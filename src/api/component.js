import getModuleNamespace from '../utilities/getModuleNamespace';

import getComponents from './getComponents';
import isComponent from './isComponent';

/**
 * @param {String} componentName 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */
export default function component(componentName, operator) {
    let namespace = node => this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue, 'strict');

    if (!componentName && !operator) {
        return getComponents.bind(this)();
    }

    if (!operator || operator === 'find') {
        return getComponents.bind(this)(componentName);
    }

    if (operator === 'is') {
        return isComponent.bind(this)(componentName);
    }

    if (operator === 'set') {
        if (this.DOMNodes instanceof NodeList) {
            this.DOMNodes.forEach(node => {
                return node.classList.add(namespace(node) + this.componentGlue + componentName);
            });
        } else {
            this.DOMNodes.classList.add(namespace(this.DOMNodes) + this.componentGlue + componentName);
        }
    }

    if (operator === 'unset') {
        if (this.DOMNodes instanceof NodeList) {
            this.DOMNodes.forEach(node => {
                return node.classList.remove(namespace(node) + this.componentGlue + componentName);
            });
        } else {
            this.DOMNodes.classList.remove(namespace(this.DOMNodes) + this.componentGlue + componentName);
        }
    }

    if (typeof operator === 'function') {
        getComponents.bind(this)(componentName).forEach(node => operator(node));
    }
}