import getNamespace from './getNamespace';
import isSafeElement from '../utilities/isSafeElement';

export default function addModifier(node, modifier, config) {
    config = config || this;

    if (node instanceof NodeList) {
        return node.forEach(node => addModifier(node, modifier, config));
    }

    const { modifierGlue } = config;

    const namespace = config.namespace || getNamespace(node, false, config);
    const safeNamespace = isSafeElement(node, namespace, config);

    if (modifier.constructor === Array) {
        modifier = modifier.join(modifierGlue);
    }

    if (safeNamespace) {
        node.classList.replace(safeNamespace, safeNamespace + modifierGlue + modifier);
    } else {
        node.classList.add(namespace + modifierGlue + modifier);
    }

    return node;
}