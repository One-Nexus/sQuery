import getNamespace from './getNamespace';
import isModule from './isModule';
import isComponent from './isComponent';
import hasModifier from './hasModifier';

export default function is(node, query, config) {
    config = config || this;

    const namespace = config.namespace || getNamespace(node, false, config);

    if (typeof query === 'object') {
        const { module, component, modifier } = query;

        if (module) {
            if (component) {
                const namespaceMatch = (namespace === module);
                const componentMatch = isComponent(node, component, config);

                if (modifier) {
                    return namespaceMatch && componentMatch && hasModifier(node, modifier, config);
                }

                return namespaceMatch && componentMatch;
            }

            return isModule(node, module, config);
        }

        if (component) {
            if (modifier) {
                return isComponent(node, component, config) && hasModifier(node, modifier, config);
            }

            return isComponent(node, component, config);
        }

        if (modifier) {
            return hasModifier(node, modifier, config)
        }
    }

    if (typeof query === 'string') {
        if (isModule(node, query, config)) {
            return isModule(node, query, config);
        }

        if (isComponent(node, query, config)) {
            return isComponent(node, query, config);
        }

        if (hasModifier(node, query, config)) {
            return hasModifier(node, query, config);
        }
    }

    return false;
}