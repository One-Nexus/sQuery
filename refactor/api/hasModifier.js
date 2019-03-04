import getNamespace from './getNamespace';

export default function hasModifer(node, modifier, config) {
    config = config || this;

    if (!modifier) return;

    if (modifier.constructor === Array) {
        return modifier.every(_modifier => hasModifier(node, _modifier, config));
    }

    if (node instanceof NodeList) {
        return [].slice.call(node).every(node => hasModifier(node, modifier, config));
    }

    const { modifierGlue } = config;

    return [].slice.call(node.classList).some(className => {
        const namespace = config.namespace || node.namespace || getNamespace(node, false, config);
        const matchIndex = className.indexOf(modifierGlue + modifier);
        const namespaceMatch  = className.indexOf(namespace) === 0;
        const isModifierTest1 = className.indexOf(modifierGlue + modifier + modifierGlue) > -1;
        const isModifierTest2 = matchIndex > -1 && matchIndex === (className.length - modifier.length - modifierGlue.length);

        return namespaceMatch && (isModifierTest1 || isModifierTest2);
    });
}