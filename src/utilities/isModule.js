/**
 * @param {*} target 
 * @param {*} moduleName 
 */
export default function isModule(target, moduleName) {
    return [...target.DOMNodes].every(node => {
        return node.matches(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`);
    });
}