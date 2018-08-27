/**
 * @param {*} target 
 * @param {*} moduleName 
 */
export default function getModules(target, moduleName) {
    let matches = [];

    target.DOMNodes.forEach(node => {
        matches.push(...node.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`));
    });

    return matches;
}