import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function getComponents(componentName = '', modifier, namespace) {
    return [...this.DOMNodes].reduce((matches, node) => {
        namespace = namespace || this.namespace || getModuleNamespace(node);

        const query = namespace + this.componentGlue + componentName;

        return matches.concat(...[...node.querySelectorAll(`[class*="${query}"]`)].filter(component => {
            return (([...component.classList].filter(className => {
                if (modifier) {
                    return className.indexOf(query) === 0 && className.indexOf(modifier) > -1;
                } else {
                    return className.indexOf(query) === 0;
                }
            })[0] || '').split(this.componentGlue).length - 1) === 1;
        }));
    }, []);
}