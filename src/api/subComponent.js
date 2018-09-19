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
        if (this.DOMNodes instanceof NodeList) {
            return [...this.DOMNodes].every(node => is.bind(this)(node, subComponentName));
        }

        return is.bind(this)(this.DOMNodes, subComponentName);
    }

    if (typeof operator === 'function') {
        getSubComponents.bind(this)(subComponentName).forEach(node => operator(node));
    }
}

/**
 * @param {HTMLElement} node 
 * @param {String} subComponentName 
 */
function is(node, subComponentName) {
    const query = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);
    const isMatch = query.indexOf(subComponentName) === (query.length - subComponentName.length);

    return [...node.classList].some(className => {
        return className.indexOf(query) > -1 && isMatch;
    });
}