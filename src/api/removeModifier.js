import getNamespace from '../utilities/getNamespace';

export default function removeModifier(node, modifier, config) {
    config = Object.assign(this || {}, config || {});

    if (modifier.constructor === Array) {
        return modifier.forEach(_modifier => removeModifier(node, _modifier, config));
    }

    if (node instanceof NodeList || node instanceof Array) {
        return node.forEach(node => removeModifier(node, modifier, config));
    }

    const { modifierGlue } = config;

    const namespace = config.namespace || getNamespace(node, true, config);

    [].slice.call(node.classList).forEach(className => {
        const moduleMatch = className.indexOf(namespace + modifierGlue) === 0;
        const modifierMatch = className.indexOf(modifierGlue + modifier) > -1;
        const newClass = className.replace(new RegExp(modifierGlue + modifier, 'g'), '');

        if (moduleMatch && modifierMatch) {
            node.classList.replace(className, newClass);
        }
    });

    if (node.repaint) {
        node.repaint();
    }

    return (typeof sQuery === 'function') ? sQuery(node) : node;
}