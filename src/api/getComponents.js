import getNamespace from './getNamespace';
import filterElements from '../utilities/filterElements';
import isValidSelector from '../utilities/isValidSelector';

export default function getComponents(node, componentName, config) {
    config = Object.assign(this || {}, config || {});

    if (componentName && !isValidSelector(componentName)) return [];

    if (node instanceof NodeList || node instanceof Array) {
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
        const sourceNamespace = getNamespace(node, true, { ...config, namespace });
        const targetNamespace = getNamespace(element, true, { ...config, namespace });

        let sourceDepth = (sourceNamespace.match(new RegExp(componentGlue, 'g')) || []).length;
        let targetDepth = (targetNamespace.match(new RegExp(componentGlue, 'g')) || []).length;

        // Special condition: if no componentName passed and we want sub-components,
        // find ALL child sub-components, as parent modules cannot have direct
        // descendant sub-components
        if (subComponent && !componentName && sourceNamespace.indexOf(componentGlue) === -1) {
            return true;
        }

        if (subComponent && !sourceDepth) {
            return false;
        }

        if (subComponent || !sourceDepth) {
            sourceDepth++;
        }

        let modifierCriteria = true;

        const targetClass = [].slice.call(element.classList).filter(className => {
            return className.indexOf(namespace) === 0;
        })[0];

        if (config.modifier) {
            modifierCriteria = targetClass.indexOf(config.modifier) > -1;
        }

        if (!subComponent && sourceDepth > 1) {
            if ((targetClass.split(componentGlue).length - 1) > 1) {
                return false;
            }

            return modifierCriteria;
        }

        return modifierCriteria && targetDepth === sourceDepth;
    });

    components = filterElements(node, components, subComponent, config);

    return components;
}