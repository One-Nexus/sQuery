/**
 * @param {*} target 
 * @param {*} moduleName 
 */
export default function getModules(target, moduleName) {
    if (target.DOMNodes instanceof NodeList) {
        return [...target.DOMNodes].reduce((matches, node) => {
            return matches.concat(...node.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`));
        }, []);
    }

    return target.DOMNodes.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`)
}