import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function unsetComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return this.DOMNodes.forEach(DOMNodes => unsetComponent.bind(Object.assign(this, { DOMNodes }))(componentName));
    }

    return [...this.DOMNodes.classList].forEach(className => {
        const isAComponent = (className.split(this.componentGlue).length - 1) === 1;
        const isMatch = className.indexOf(
            (this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue)) + this.componentGlue + componentName
        ) === 0;

        if (isAComponent && isMatch) {
            this.DOMNodes.classList.remove(className);
        }
    });
}