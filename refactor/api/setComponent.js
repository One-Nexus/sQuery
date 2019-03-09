import getNamespace from './getNamespace';

export default function setComponent(node, componentName, namespace, replace, config) {
    config = config || this;

    if (node instanceof NodeList) {
        return node.forEach(node => setComponent(node, componentName, namespace, replace, config));
    }

    if (!namespace && !replace) {
        replace = config.namespace || getNamespace(node, false, config);
    }

    namespace = namespace || config.namespace || getNamespace(node, false, config);

    node.classList.add(namespace + config.componentGlue + componentName);
    node.setAttribute('data-component', componentName);

    replace && node.classList.remove(replace);
}