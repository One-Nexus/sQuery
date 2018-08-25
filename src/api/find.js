import getComponents from '../utilities/getComponents';
import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} query 
 */
export default function find(query) {
    if (typeof query === 'object') {
        let matches = [];
    
        this.DOMNodes.forEach(node => {
            if (query.module) {
                if (query.component) {
                    if (query.modifier) {
                        return matches.push(...getComponents(this, query.component, query.module, query.modifier));
                    }
                    
                    return matches.push(...getComponents(this, query.component, query.module));
                }

                return matches.push(...node.querySelectorAll(`.${query.module}, [class*="${query.module + query.modifierGlue}"]`));
            }

            if (query.component) {
                const components = getComponents(this, query.component);

                if (query.modifier) {
                    return matches.push(
                        ...components.filter(component => {
                            return [...component.classList].some(className => {
                                const isNamespace = className.indexOf(this.namespace || getModuleNamespace(component)) === 0;
                                const hasModifier = className.indexOf(query.modifier) > -1;

                                return isNamespace && hasModifier;
                            });
                        })
                    );
                }

                return matches.push(...components);
            }

            if (query.modifier) {
                return;
            }
        });

        return matches;
    }

    if (typeof query === 'string') {
        if (getComponents(this, query).length) {
            return getComponents(this, query);
        }

        if (getModules(this, query).length) {
            return getModules(this, query);
        }
    }
}

function getModules(target, moduleName) {
    let matches = [];

    target.DOMNodes.forEach(node => {
        matches.push(...node.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`));
    });

    return matches;
}