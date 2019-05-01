import hasModifier from './hasModifier';
import addModifier from './addModifier';
import removeModifier from './removeModifier';

export default function toggleModifier(node, modifier, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return node.forEach(node => toggleModifier(node, modifier, config));
    }

    if (hasModifier(node, modifier, config)) {
        return removeModifier(node, modifier, config);
    } else {
        return addModifier(node, modifier, config);
    }
}