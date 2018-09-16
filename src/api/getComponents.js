import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function getComponents(componentName = '', modifier, namespace) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].reduce((matches, node) => {
            return matches.concat(...getComponents.bind(Object.assign(this, { DOMNodes: node }))(componentName, modifier, namespace));
        }, []);
    }

    namespace = namespace || this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict');

    const query = namespace + (componentName ? (this.componentGlue + componentName) : '');

    return [].concat(...[...this.DOMNodes.querySelectorAll(`[class*="${query}"]`)].filter(component => {
        return ([...component.classList].some(className => {
            const isComponent = (className.split(this.componentGlue).length - 1) === 1;
            const isQueryMatch = className.indexOf(query) === 0;

            if (modifier) {
                return isQueryMatch && isComponent && className.indexOf(modifier) > -1;
            } else {
                return isQueryMatch && isComponent;
            }
        }));
    }));
}