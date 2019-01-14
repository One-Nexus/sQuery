/**
 * @param {*} target 
 * @param {*} moduleName 
 */
export default function isModule(target, moduleName) {
    const DOMNodes = !(target.DOMNodes instanceof NodeList) ? [target.DOMNodes] : target.DOMNodes;

    return [...DOMNodes].every(node => {
        return node.matches(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`);
    });
}