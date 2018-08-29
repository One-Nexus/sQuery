import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function getComponents(componentName = '', modifier, namespace) {
    return [...this.DOMNodes].reduce((matches, node) => {
        namespace = namespace || this.namespace || getModuleNamespace(node, 'strict');

        const query = namespace + (componentName ? (this.componentGlue + componentName) : '');

        return matches.concat(...[...node.querySelectorAll(`[class*="${query}"]`)].filter(component => {
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
    }, []);
}