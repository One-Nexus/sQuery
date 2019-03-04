export default function getModules(node, moduleName, config) {
    config = config || this;

    const { modifierGlue } = config;

    if (node instanceof NodeList) {
        return [].slice.call(node).reduce((matches, node) => {
            return matches.concat([].slice.call(getModules(node, moduleName, config)));
        }, []);
    }

    return node.querySelectorAll(`.${moduleName}, [class*="${moduleName + modifierGlue}"]`)
}