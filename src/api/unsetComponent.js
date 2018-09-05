import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function unsetComponent(componentName) {
    return [...this.DOMNodes].forEach(node => {
        return [...node.classList].forEach(className => {
            const isAComponent = (className.split(this.componentGlue).length - 1) === 1;
            const isMatch = className.indexOf(
                (this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue)) + this.componentGlue + componentName
            ) === 0;

            if (isAComponent && isMatch) {
                node.classList.remove(className);
            }
        });
    });
}