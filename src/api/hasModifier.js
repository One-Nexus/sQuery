import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} modifier 
 */
export default function hasModifier(modifier) {
    if (modifier) {
        if (modifier.constructor === Array) {
            return modifier.every(_modifier => hasModifier.bind(this)(_modifier));
        }

        if (this.DOMNodes instanceof NodeList) {
            return [...this.DOMNodes].every(DOMNodes => hasModifier.bind(Object.assign(this, { DOMNodes }))(modifier));
        }

        const node = this.DOMNodes;

        return [...node.classList].some(className => {
            const namespace = this.namespace || node.namespace || getModuleNamespace(node, this.modifierGlue, this.componentGlue);
            const matchIndex = className.indexOf(this.modifierGlue + modifier);
            const namespaceMatch  = className.indexOf(namespace) === 0;
            const isModifierTest1 = className.indexOf(this.modifierGlue + modifier + this.modifierGlue) > -1;
            const isModifierTest2 = matchIndex > -1 && matchIndex === (className.length - modifier.length - 1);
    
            return namespaceMatch && (isModifierTest1 || isModifierTest2);
        });
    }
}