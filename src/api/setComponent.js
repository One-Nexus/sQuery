import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function setComponent(componentName) {
    this.DOMNodes.forEach(node => {        
        const namespace = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);

        node.classList.remove(namespace);
        node.classList.add(namespace + this.componentGlue + componentName);
    });
}