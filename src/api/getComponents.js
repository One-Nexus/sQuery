import getModuleNamespace from '../utilities/getModuleNamespace';
import parent from './parent';

/**
 * @param {*} componentName 
 */
export default function getComponents(componentName = '', modifier, namespace) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].reduce((matches, node) => {
            return matches.concat(...getComponents.bind(Object.assign(this, { DOMNodes: node }))(componentName, modifier, namespace));
        }, []);
    }

    if (componentName.indexOf('modifier(') === 0) return;

    namespace = namespace || this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict');

    const query = namespace + (componentName ? (this.componentGlue + componentName) : '');

    return [].concat(...[...this.DOMNodes.querySelectorAll(`.${query}, [class*="${query + this.modifierGlue}"]`)].filter(component => {
        const parentModule = parent.bind(Object.assign(this, { DOMNodes: component }))(namespace);
        const parentElementIsModule = this.parentElement.matches(`.${namespace}, [class*="${namespace}-"]`);

        if (this.parentElement && parentElementIsModule && this.parentElement !== parentModule) {
            return false;
        }
        
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