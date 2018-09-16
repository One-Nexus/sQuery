import getModuleNamespace from '../utilities/getModuleNamespace';
import getModules from '../utilities/getModules';

import getComponents from './getComponents';

/**
 * @param {*} query 
 */
export default function find(query) {
    if (typeof query === 'object') {
        if (this.DOMNodes instanceof NodeList) {
            return [...this.DOMNodes].reduce((matches, DOMNodes) => {
                return matches.concat(...find.bind(Object.assign(this, { DOMNodes }))(query));
            }, []);
        }

        let matches = [];

        if (query.module) {
            if (query.component) {
                matches.push(...getComponents.bind(this)(query.component, query.modifier, query.module));
            }

            matches.push(...this.DOMNodes.querySelectorAll(`.${query.module}, [class*="${query.module + query.modifierGlue}"]`));
        }

        if (query.component) {
            const components = getComponents.bind(this)(query.component);

            if (query.modifier) {
                matches.push(
                    ...components.filter(component => {
                        return [...component.classList].some(className => {
                            const isNamespace = className.indexOf(this.namespace || getModuleNamespace(component, this.componentGlue, this.modifierGlue)) === 0;
                            const hasModifier = className.indexOf(query.modifier) > -1;

                            return isNamespace && hasModifier;
                        });
                    })
                );
            }

            matches.push(...components);
        }

        // console.log(matches);

        return matches;
    }

    if (typeof query === 'string') {
        if (getComponents.bind(this)(query).length) {
            return getComponents.bind(this)(query);
        }

        if (getModules(this, query).length) {
            return getModules(this, query);
        }
    }
}