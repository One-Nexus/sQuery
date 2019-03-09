import component from './component';
import getSubComponent from './getSubComponent';
import getSubComponents from './getSubComponents';

export default function subComponent(node, subComponentName, operator, config) {
    config = config || this;

    config.subComponent = true;
    config.getSubComponent = getSubComponent;
    config.getSubComponents = getSubComponents;

    return component(node, subComponentName, operator, config);
}