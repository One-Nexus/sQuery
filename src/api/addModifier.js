import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {(String|Array)} modifier 
 */
export default function addModifier(modifier) {
    this.DOMNodes.forEach(node => {
        if (modifier.constructor === Array) {
            modifier = modifier.join(this.modifierGlue);
        }

        node.classList.add(this.namespace || getModuleNamespace(node) + this.modifierGlue + modifier);
    });
}