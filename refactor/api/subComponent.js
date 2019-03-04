import getNamespace from './getNamespace';
import getSubComponents from './getSubComponents';

export default function subComponent(node, subComponentName, operator, config) {
    config = config || this;

    if (!subComponentName && !operator) {
        return getSubComponents(node, false, config);
    }

    if (!operator || operator === 'find') {
        return getSubComponents(node, subComponentName, config);
    }

    if (operator === 'is') {
        if (node instanceof NodeList) {
            return [].slice.call(node).every(node => is(node, subComponentName, config));
        }

        return is(node, subComponentName, config);
    }

    if (typeof operator === 'function') {
        getSubComponents(node, subComponentName, config).forEach(node => operator(node));
    }
}

function is(node, subComponentName, config) {
    const query = config.namespace || getNamespace(node, false, config);
    const isMatch = query.indexOf(subComponentName) === (query.length - subComponentName.length);

    return [].slice.call(node.classList).some(className => {
        return className.indexOf(query) > -1 && isMatch;
    });
}