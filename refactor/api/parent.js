import getNamespace from './getNamespace';

export default function parent(node, query, config) {
    config = config || this;

    if (node instanceof NodeList) {
        return [].slice.call(node).map(node => parent(node, query, config));
    }

    const { componentGlue, modifierGlue } = config;

    const namespace = config.namespace || getNamespace(node, false, config);

    query = query || namespace;

    if (query !== namespace) {
        query = namespace + componentGlue + query;
    }

    if (query) {
        return node.closest(`.${query}, [class*='${query + modifierGlue}']`);
    }
}