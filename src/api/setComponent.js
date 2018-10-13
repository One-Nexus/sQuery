import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function setComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(DOMNodes => setComponent.bind(Object.assign(this, { DOMNodes }))(componentName));
    }

    const namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);

    this.DOMNodes.classList.add(namespace + this.componentGlue + componentName);
}