/**
 * @param {*} target 
 * @param {*} moduleName 
 */
export default function getModules(target, moduleName) {
    return [...target.DOMNodes].reduce((matches, node) => {
        return matches.concat(...node.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`));
    }, []);
}