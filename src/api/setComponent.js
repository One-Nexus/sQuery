import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function setComponent(componentName, namespace, replace) {
    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(DOMNodes => setComponent.bind(Object.assign(this, { DOMNodes }))(componentName));
    }

    if (!namespace && !replace) {
        replace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);
    }

    namespace = namespace || this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);

    this.DOMNodes.classList.add(namespace + this.componentGlue + componentName);
    this.DOMNodes.setAttribute('data-component', componentName);

    replace && this.DOMNodes.classList.remove(replace);
}