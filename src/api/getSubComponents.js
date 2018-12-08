import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} subComponentName 
 */
export default function getSubComponts(subComponentName, context = [], modifier) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].reduce((matches, DOMNodes) => {
            return matches.concat(...getSubComponts.bind(Object.assign(this, { DOMNodes }))(subComponentName, context, modifier));
        }, []);
    }

    let namespace = this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue);

    if (context.length) {
        namespace = [namespace].concat(context, [subComponentName]).join(this.componentGlue);
    }

    const depth = namespace.split(this.componentGlue).length - 1;

    return [].concat(...[...this.DOMNodes.querySelectorAll(`[class*="${namespace}"]`)].filter(subComponent => {
        return [...subComponent.classList].some(className => {
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
    }));
}