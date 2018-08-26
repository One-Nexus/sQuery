import getModuleNamespace from '../utilities/getModuleNamespace';

import isComponent from './isComponent';
import hasModifier from './hasModifier';

/**
 * @param {*} query 
 */
export default function is(query) {
    if (typeof query === 'object') {
        if (query.module) {
            if (query.component) {
                const isModuleNamespace = [...this.DOMNodes].every(node => {
                    return (this.namespace || getModuleNamespace(node, true)) === query.module;
                });

                if (query.modifier) {
                    return isModuleNamespace && isComponent.bind(this)(query.component) && hasModifier.bind(this)(query.modifier);
                }

                return isModuleNamespace && isComponent.bind(this)(query.component);
            }

            return isModule(this, query.module);
        }

        if (query.component) {
            if (query.modifier) {
                return isComponent.bind(this)(query.component) && hasModifier.bind(this)(query.modifier);
            }

            return isComponent.bind(this)(query.component);
        }

        if (query.modifier) {
            return hasModifier.bind(this)(query.modifier)
        }
    }

    if (typeof query === 'string') {
        if (isModule(this, query)) {
            return isModule(this, query);
        }

        if (isComponent.bind(this)(query)) {
            return isComponent.bind(this)(query);
        }

        if (hasModifier.bind(this)(query)) {
            return hasModifier.bind(this)(query);
        }
    }
}

function isModule(target, moduleName) {
    return [...target.DOMNodes].every(node => {
        return node.matches(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`);
    });
}