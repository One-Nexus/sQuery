import isComponent from './isComponent';
import hasModifier from './hasModifier';

/**
 * @param {*} query 
 */
export default function is(query) {
    if (typeof query === 'object') {

    }

    if (typeof query === 'string') {
        if (getModules(this, query).length) {
            return getModules(this, query);
        }

        if (isComponent.bind(this)(query)) {
            return isComponent.bind(this)(query);
        }

        if (hasModifier.bind(this)(query)) {
            return hasModifier.bind(this)(query);
        }
    }
}

function getModules(target, moduleName) {
    let matches = [];

    target.DOMNodes.forEach(node => {
        matches.push(...node.querySelectorAll(`.${moduleName}, [class*="${moduleName + target.modifierGlue}"]`));
    });

    return matches;
}