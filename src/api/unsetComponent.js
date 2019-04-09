import getNamespace from './getNamespace';

export default function unsetComponent(node, componentName, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return node.forEach(node => unsetComponent(node, componentName, config));
    }

    const { componentGlue } = config;

    const namespace = config.namespace || getNamespace(node, false, config);

    return [].slice.call(node.classList).forEach(className => {
        const isAComponent = (className.split(componentGlue).length - 1) === 1;
        const isMatch = className.indexOf(namespace + componentGlue + componentName) === 0;

        if (isAComponent && isMatch) {
            node.classList.remove(className);
        }
    });
}