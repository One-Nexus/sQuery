import component from './component';
import getSubComponent from './getSubComponent';
import getSubComponents from './getSubComponents';

export default function subComponent(node, subComponentName, operator, config) {
    config = Object.assign(this || {}, config || {});

    config.subComponent = true;
    config.getSubComponent = getSubComponent;
    config.getSubComponents = getSubComponents;

    return component(node, subComponentName, operator, config);
}