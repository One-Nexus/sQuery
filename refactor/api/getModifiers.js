import getNamespace from './getNamespace';

export default function getModifiers(node, config) {
    config = config || this;

    if (node instanceof NodeList) {
        return [].slice.call(node).reduce((matches, node) => {
            return matches.concat(getModifiers(node, config));
        }, []);
    }

    const { namespace, modifierGlue } = config;

    return [].slice.call(node.classList).filter(className => {
        return className.indexOf(namespace || getNamespace(node, false, config)) === 0
    }).map(target => target.split(modifierGlue).slice(1))[0];
}