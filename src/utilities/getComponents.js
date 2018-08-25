import getModuleNamespace from './getModuleNamespace';

/**
 * Get child components of an element
 * 
 * @param {*} target 
 * @param {*} componentName 
 */
export default function getComponents(target, componentName = '', namespace, modifier) {
    let matches = [];

    target.DOMNodes.forEach(node => {
        namespace = namespace || target.namespace || getModuleNamespace(node);

        const query = namespace + target.componentGlue + componentName;

        matches.push(...[...node.querySelectorAll(`[class*="${query}"]`)].filter(component => {
            return (([...component.classList].filter(className => {
                if (modifier) {
                    return className.indexOf(query) === 0 && className.indexOf(modifier) > -1;
                } else {
                    return className.indexOf(query) === 0;
                }
            })[0] || '').split(target.componentGlue).length - 1) === 1;
        }));
    });

    return matches;
}