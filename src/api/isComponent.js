import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function isComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].every(DOMNodes => {
            return isComponent.bind(Object.assign(this, { DOMNodes }))(componentName);
        });
    }

    return [...this.DOMNodes.classList].some(className => {
        const isAComponent = (className.split(this.componentGlue).length - 1) === 1;
        const query = (this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict')) + this.componentGlue + componentName;
        const isMatch = query.indexOf(this.componentGlue + componentName) > -1;

        return className.indexOf(query) === 0 && isAComponent && isMatch;
    });
}