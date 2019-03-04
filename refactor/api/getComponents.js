import getNamespace from './getNamespace';
import filterElements from '../utilities/filterElements';
import isValidSelector from '../utilities/isValidSelector';

export default function getComponents(node, componentName, config) {
    config = config || this;

    if (componentName && !isValidSelector(componentName)) return [];

    if (node instanceof NodeList) {
        return [].slice.call(node).reduce((matches, node) => {
            return matches.concat([].slice.call(getComponents(node, componentName, config)));
        }, []);
    }

    const { subComponent, modifierGlue, componentGlue } = config;

    const namespace = config.namespace || getNamespace(node, subComponent, config);

    let components;

    if (!componentName) {
        components = node.querySelectorAll(`[class*='${namespace + componentGlue}']`);
    } else {
        const query = namespace + componentGlue + componentName;
    
        components = node.querySelectorAll(`.${query}, [class*='${query + modifierGlue}']`);
    }

    components = [].slice.call(components).filter(element => {
        const sourceNamespace = getNamespace(node, true, config);
        const targetNamespace = getNamespace(element, true, config);

        let sourceDepth = (sourceNamespace.match(new RegExp(componentGlue, 'g')) || []).length;
        let targetDepth = (targetNamespace.match(new RegExp(componentGlue, 'g')) || []).length;

        if (subComponent || !sourceDepth) {
            sourceDepth++;
        }

        let modifierCriteria = true;

        if (config.modifier) {
            modifierCriteria = [].slice.call(element.classList).filter(className => {
                return className.indexOf(namespace) === 0;
            })[0].indexOf(config.modifier) > -1;
        }

        return modifierCriteria && targetDepth === sourceDepth;
    });

    components = filterElements(node, components, config);

    return components;
}