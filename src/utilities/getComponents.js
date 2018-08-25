import getModuleNamespace from './getModuleNamespace';

/**
 * Get child components of an element
 * 
 * @param {*} target 
 * @param {*} componentName 
 */
export default function getComponents(target, componentName = '') {
    let matches = [];

    target.DOMNodes.forEach(node => {
        const namespace = target.namespace || getModuleNamespace(node);
        const query = namespace + target.componentGlue + componentName;

        matches.push(...[...node.querySelectorAll(`[class*="${query}"]`)].filter(component => {
            return ([...component.classList].filter(className => {
                return className.indexOf(query) === 0;
            })[0].split(target.componentGlue).length - 1) === 1;
        }));
    });

    return Object.assign({}, matches);
}