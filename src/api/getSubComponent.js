import getSubComponents from './getSubComponents';

export default function getSubComponent(node, componentName, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return [].slice.call(node).map(node => getSubComponent(node, componentName, config));
    };

    return getSubComponents(node, componentName, config)[0]
}