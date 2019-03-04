import getNamespace from './getNamespace';
import getModules from './getModules';
import getComponents from './getComponents';

export default function find(node, query, config) {
    config = config || this;

    if (typeof query === 'object') {
        if (node instanceof NodeList) {
            return [].slice.call(node).reduce((matches, node) => {
                return matches.concat(getQueryFromObject(node, query, config));
            }, []);
        }

        return getQueryFromObject(node, query, config);
    }

    if (typeof query === 'string') {
        const modules = getModules(node, query, config);

        if (modules.length) {
            return modules;
        }

        const components = getComponents(node, query, config);

        if (components.length) {
            return components;
        }
    }
}

function getQueryFromObject(node, query, config) {
    config = config || this;

    const matches = [];

    const { module, component, modifier } = query;
    const { modifierGlue } = config;

    if (module) {
        if (component) {
            return matches.concat([].slice.call(
                getComponents(node, component, { namespace: module, modifier, ...config })
            ));
        }

        return matches.concat([].slice.call(
            node.querySelectorAll(`.${module}, [class*="${module + modifierGlue}"]`)
        ));
    }

    if (component) {
        const components = getComponents(node, component, config);

        if (modifier) {
            return matches.concat(
                [].slice.call(components.filter(component => {
                    return [].slice.call(component.classList).some(className => {
                        const namespace = config.namespace || getNamespace(component, false, config);
                        const isNamespace = className.indexOf(namespace) === 0;
                        const hasModifier = className.indexOf(modifier) > -1;

                        return isNamespace && hasModifier;
                    });
                }))
            );
        }

        return matches.concat([].slice.call(components));
    }

    if (modifier) {
        return;
    }
}