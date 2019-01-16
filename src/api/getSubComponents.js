import getModuleNamespace from '../utilities/getModuleNamespace';
import isValidSelector from '../utilities/isValidSelector';

/**
 * @param {*} subComponentName 
 */
export default function getSubComponts(subComponentName, context = [], modifier) {
    if (subComponentName && !isValidSelector(subComponentName)) return [];

    if (this.DOMNodes instanceof NodeList) {
        return Array.prototype.slice.call(this.DOMNodes).reduce((matches, DOMNodes) => {
            return matches.concat(Array.prototype.slice.call(getSubComponts.bind(Object.assign(this, { DOMNodes }))(subComponentName, context, modifier)));
        }, []);
    }

    let namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue) || '';

    const depth = namespace.split(this.componentGlue).length - 1;

    if (context.length) {
        namespace = [namespace].concat(context, [subComponentName]).join(this.componentGlue);
    } else if (subComponentName) {
        namespace = namespace + this.componentGlue + subComponentName;
    }

    let selector = `.${namespace}, [class*="${namespace + this.modifierGlue}"]`;

    if (!subComponentName) {
        selector = `[class*="${namespace + this.componentGlue}"]`;
    }

    return Array.prototype.slice.call(this.DOMNodes.querySelectorAll(selector)).filter(subComponent => {
        return Array.prototype.slice.call(subComponent.classList).some(className => {
            if ((className.match(new RegExp(this.componentGlue, 'g')) || []).length < 2) {
                return false;
            }

            let namespaceMatch;

            if (modifier) {
                namespaceMatch = className.indexOf(namespace) === 0 && className.indexOf(modifier) > -1;
            } else {
                namespaceMatch = className.indexOf(namespace) === 0;
            }

            const depthMatch = (className.split(this.componentGlue).length - 1) === (context.length ? depth : depth + 1);

            return depth ? (namespaceMatch && depthMatch) : namespaceMatch;
        });
    });
}