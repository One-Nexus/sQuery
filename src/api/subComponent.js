import getSubComponents from './getSubComponents';

import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {String} componentName 
 * @param {(('find'|'is')|Function)} operator 
 */
export default function subComponent(subComponentName, operator) {
    if (!subComponentName && !operator) {
        return getSubComponents.bind(this)();
    }

    if (!operator || operator === 'find') {
        return getSubComponents.bind(this)(subComponentName);
    }

    if (operator === 'is') {
        return [...this.DOMNodes].every(node => {
            const query = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);
            const isMatch = query.indexOf(subComponentName) === (query.length - subComponentName.length);

            return [...node.classList].some(className => {
                return className.indexOf(query) > -1 && isMatch;
            });
        });
    }

    if (typeof operator === 'function') {
        getSubComponents.bind(this)(subComponentName).forEach(node => operator(node));
    }
}