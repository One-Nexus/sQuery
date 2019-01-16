import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {(String|Array)} modifier 
 */
export default function removeModifier(modifier) {
    if (modifier.constructor === Array) {
        return modifier.forEach(_modifier => {
            removeModifier.bind(Object.assign(this))(_modifier);
        });
    }

    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(node => removeModifier.bind(Object.assign(this, { DOMNodes: node }))(modifier));
    }

    const node = this.DOMNodes;

    Array.prototype.slice.call(node.classList).forEach(className => {
        const moduleMatch = className.indexOf((this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue)) + this.modifierGlue) === 0;
        const modifierMatch = className.indexOf(this.modifierGlue + modifier) > -1;
        const newClass = className.replace(new RegExp(this.modifierGlue + modifier, 'g'), '');

        if (moduleMatch && modifierMatch) {
            node.classList.remove(className);
            node.classList.add(newClass);
        }
    });
}