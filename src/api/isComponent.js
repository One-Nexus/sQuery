import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function isComponent(componentName) {
    return [...this.DOMNodes].every(node => {
        return [...node.classList].some(className => {
            const isAComponent = (className.split(this.componentGlue).length - 1) === 1;
            const query = this.namespace || getModuleNamespace(node, this.componentGlue, this.modifierGlue);
            const isMatch = query.indexOf(this.componentGlue + componentName) > -1;

            return className.indexOf(query) === 0 && isAComponent && isMatch;
        });
    });
}