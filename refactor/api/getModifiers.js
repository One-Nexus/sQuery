import getNamespace from './getNamespace';

export default function getModifiers(node, config) {
    config = config || this;

    if (node instanceof NodeList) {
        let modifiers = [].slice.call(node).reduce((matches, node) => {
            return matches.concat(getModifiers(node, config));
        }, []);

        // remove duplicates
        modifiers = [...new Set(modifiers)];

        return modifiers;
    }

    const { namespace, modifierGlue } = config;

    const targetClass = [].slice.call(node.classList).filter(className => {
        return className.indexOf(namespace || getNamespace(node, false, config)) === 0
    })[0];

    const modifiers = targetClass.split(modifierGlue).slice(1);

    return modifiers;
}