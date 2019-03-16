import getModules from './getModules';
import getComponents from './getComponents';
import hasModifier from './hasModifier';

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

    const { module, component, modifier } = query;

    let matches = [];

    if (module) {
        if (component) {
            matches = getComponents(node, component, { ...config, namespace: module, modifier });
        } else {
            matches = getModules(node, module, config);
        }
    } else if (component) {
        matches = getComponents(node, component, { ...config, modifier });
    }

    if (modifier) {
        matches = [].slice.call(matches).filter(match => hasModifier(match, modifier, config));
    }

    return matches;
}