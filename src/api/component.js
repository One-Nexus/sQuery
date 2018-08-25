import getModuleNamespace from '../utilities/getModuleNamespace';
import getComponents from '../utilities/getComponents';

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
        return [...this.DOMNodes].every(node => {
            return [...node.classList].some(className => {
                const isComponent = (className.split(this.componentGlue).length - 1) === 1;

                return className.indexOf(this.namespace || getModuleNamespace(node)) === 0 && isComponent;
            });
        });
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

    return;
}