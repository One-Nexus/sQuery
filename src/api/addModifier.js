import getNamespace from '../utilities/getNamespace';
import isSafeElement from '../utilities/isSafeElement';

export default function addModifier(node, modifier, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return node.forEach(node => addModifier(node, modifier, config));
    }

    const { modifierGlue } = config;

    const namespace = config.namespace || getNamespace(node, true, config);
    const safeNamespace = isSafeElement(node, namespace, config);

    if (modifier.constructor === Array) {
        modifier = modifier.join(modifierGlue);
    }

    if (safeNamespace && !config.multipleClasses) {
        node.classList.replace(safeNamespace, safeNamespace + modifierGlue + modifier);
    } else {
        node.classList.add(namespace + modifierGlue + modifier);
    }

    if (node.repaint) {
        node.repaint();
    }

    return node;
}