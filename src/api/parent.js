import getNamespace from '../utilities/getNamespace';

export default function parent(node, query, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return [].slice.call(node).map(node => parent(node, query, config));
    }

    const { componentGlue, modifierGlue } = config;

    let namespace = config.namespace || getNamespace(node, false, config);

    let $query = query || namespace;

    if ($query !== namespace) {
        $query = namespace + componentGlue + $query;
    }

    const parentComponent = $query && node.closest(`.${$query}, [class*='${$query + modifierGlue}']`);

    // console.log(`.${$query}, [class*='${$query + modifierGlue}']`, config, parentComponent);

    if (parentComponent) {
        return parentComponent;
    }

    namespace = config.namespace || getNamespace(node, true, config);

    if (namespace && namespace.indexOf(query > -1)) {
        $query = namespace.substring(0, namespace.indexOf(query) + query.length);
    }

    const parentSubComponent = $query && node.closest(`.${$query}, [class*='${$query + modifierGlue}']`);

    if (parentSubComponent) {
        return parentSubComponent;
    }
}