import getComponents from './getComponents';

export default function getSubComponents(node, subComponentName, config) {
    config = config || this;

    config.subComponent = true;

    return getComponents(node, subComponentName, config);
}