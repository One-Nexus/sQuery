import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {(String|Array)} modifier 
 */
export default function addModifier(modifier) {
    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(node => addModifier.bind(Object.assign(this, { DOMNodes: node }))(modifier));
    }

    if (modifier.constructor === Array) {
        modifier = modifier.join(this.modifierGlue);
    }

    const namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);

    this.DOMNodes.classList.add(namespace + this.modifierGlue + modifier);

    return this.DOMNodes;
}