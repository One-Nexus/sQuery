import getModuleNamespace from '../utilities/getModuleNamespace';

import getComponents from './getComponents';
import isComponent from './isComponent';

/**
 * @param {String} componentName 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */
export default function component(componentName, operator) {
    let namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);

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
                namespace = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);

                return node.classList.add(namespace + this.componentGlue + componentName)
            });
        } else {
            this.DOMNodes.classList.add(namespace + this.componentGlue + componentName)
        }
    }

    if (operator === 'unset') {
        if (this.DOMNodes instanceof NodeList) {
            this.DOMNodes.forEach(node => {
                namespace = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);

                return node.classList.remove(namespace)
            });
        } else {
            this.DOMNodes.classList.remove(namespace)
        }
    }

    if (typeof operator === 'function') {
        getComponents.bind(this)(componentName).forEach(node => operator(node));
    }
}