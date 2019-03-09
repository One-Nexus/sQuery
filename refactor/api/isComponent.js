import getNamespace from './getNamespace';

export default function isComponent(node, componentName, config) {
    config = config || this;

    if (node instanceof NodeList) {
        return [].slice.call(node).every(node => isComponent(node, componentName, config));
    }

    const { componentGlue } = config;

    const namespace = config.namespace || getNamespace(node, false, config);

    return [].slice.call(node.classList).some(className => {
        if (config.subComponent) {
            const isMatch = namespace.indexOf(componentName) === (namespace.length - componentName.length);
    
            return className.indexOf(namespace) > -1 && isMatch;
        }

        const isAComponent = (className.split(componentGlue).length - 1) === 1;
        const query = namespace + componentGlue + componentName;
        const isMatch = query.indexOf(componentGlue + componentName) > -1;

        return className.indexOf(query) === 0 && isAComponent && isMatch;
    });
}