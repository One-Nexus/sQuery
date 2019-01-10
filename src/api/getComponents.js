import getModuleNamespace from '../utilities/getModuleNamespace';
import isValidSelector from '../utilities/isValidSelector';
import parent from './parent';

/**
 * @param {*} componentName 
 */
export default function getComponents(componentName = '', modifier, namespace) {
    if (componentName && !isValidSelector(componentName)) return [];

    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].reduce((matches, node) => {
            return matches.concat(...getComponents.bind(Object.assign(this, { DOMNodes: node }))(componentName, modifier, namespace));
        }, []);
    }

    if (componentName.indexOf('modifier(') === 0) return;

    namespace = namespace || this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue, 'strict');

    const query = namespace + (componentName ? (this.componentGlue + componentName) : '');

    let selector = `.${query}, [class*="${query + this.modifierGlue}"]`;

    if (!componentName) {
        selector = `[class*="${query + this.componentGlue}"]`;
    }

    const subComponents = [...this.DOMNodes.querySelectorAll(selector)].filter(component => {
        const parentModule = parent.bind(Object.assign(this, { DOMNodes: component }))(namespace);
        const parentElementIsModule = this.parentElement ? this.parentElement.matches(`.${namespace}, [class*="${namespace}-"]`) : false;

        if (parentElementIsModule && this.parentElement !== parentModule) {
            return false;
        }
        
        return [...component.classList].some(className => {
            const isComponent = (className.split(this.componentGlue).length - 1) === 1;
            const isQueryMatch = className.indexOf(query) === 0;

            if (modifier) {
                return isQueryMatch && isComponent && className.indexOf(modifier) > -1;
            } else {
                return isQueryMatch && isComponent;
            }
        });
    });

    // console.log(subComponents)

    return subComponents;
}