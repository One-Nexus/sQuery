import hasModifier from './hasModifier';
import addModifier from './addModifier';
import removeModifier from './removeModifier';
import toggleModifier from './toggleModifier';
import getModifiers from './getModifiers';

export default function modifier(node, modifier, operator, config) {
    config = Object.assign(this || {}, config || {});

    if (!operator && !modifier) {
        return getModifiers(node, config);
    }

    if (!operator || operator === 'is') {
        return hasModifier(node, modifier, config);
    }

    if (operator === 'set' || operator === 'add') {
        return addModifier(node, modifier, config);
    }

    if (operator === 'unset' || operator === 'remove') {
        return removeModifier(node, modifier, config);
    }

    if (operator === 'toggle') {
        return toggleModifier(node, modifier, config);
    }
}