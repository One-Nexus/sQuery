import getNamespace from '../utilities/getNamespace';

export default function isComponent(node, componentName, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return [].slice.call(node).every(node => isComponent(node, componentName, config));
    }

    const { componentGlue } = config;

    const namespace = config.namespace || getNamespace(node, false, config);

    return [].slice.call(node.classList).some(className => {
        if (config.subComponent) {
            const isASubComponent = (className.split(componentGlue).length - 1) > 1;
            const isMatch = className.indexOf(componentName) === (className.length - componentName.length);

            return isASubComponent && isMatch;
        }

        const isAComponent = (className.split(componentGlue).length - 1) === 1;
        const query = namespace + componentGlue + componentName;
        const isMatch = query.indexOf(componentGlue + componentName) > -1;

        return className.indexOf(query) === 0 && isAComponent && isMatch;
    });
}