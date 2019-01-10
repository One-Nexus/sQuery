import getModuleNamespace from '../utilities/getModuleNamespace';
import getModules from '../utilities/getModules';

import getComponents from './getComponents';

/**
 * @param {*} query 
 */
export default function find(query) {
    if (typeof query === 'object') {
        if (this.DOMNodes instanceof NodeList) {
            return [...this.DOMNodes].reduce((matches, node) => {
                return matches.concat(getQueryFromObject.bind(this)(query, node));
            }, []);
        }

        return getQueryFromObject.bind(this)(query, this.DOMNodes);
    }

    if (typeof query === 'string') {
        const components = getComponents.bind(this)(query);

        if (components.length) {
            return components;
        }

        if (getModules(this, query).length) {
            return getModules(this, query);
        }
    }
}

/**
 * @param {Object} query 
 * @param {HTMLElement} node 
 */
function getQueryFromObject(query, node) {
    const matches = [];

    if (query.module) {
        if (query.component) {
            return matches.concat(...getComponents.bind(this)(query.component, query.modifier, query.module));
        }

        return matches.concat(...node.querySelectorAll(`.${query.module}, [class*="${query.module + query.modifierGlue}"]`));
    }

    if (query.component) {
        const components = getComponents.bind(this)(query.component);

        if (query.modifier) {
            return matches.concat(
                ...components.filter(component => {
                    return [...component.classList].some(className => {
                        const isNamespace = className.indexOf(this.namespace || getModuleNamespace(component, this.componentGlue, this.modifierGlue)) === 0;
                        const hasModifier = className.indexOf(query.modifier) > -1;

                        return isNamespace && hasModifier;
                    });
                })
            );
        }

        return matches.concat(...components);
    }

    if (query.modifier) {
        return;
    }
}