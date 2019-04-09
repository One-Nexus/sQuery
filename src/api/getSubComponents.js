import getComponents from './getComponents';

export default function getSubComponents(node, subComponentName, config) {
    config = Object.assign(this || {}, config || {});

    config.subComponent = true;

    return getComponents(node, subComponentName, config);
}