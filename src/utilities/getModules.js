/**
 * @param {*} target 
 * @param {*} moduleName 
 */
export default function getModules(target, moduleName) {
    if (target.DOMNodes instanceof NodeList) {
        return Array.prototype.slice.call(this.DOMNodes).reduce((matches, node) => {
            return matches.concat(Array.prototype.slice.call(node.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`)));
        }, []);
    }

    return target.DOMNodes.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`)
}