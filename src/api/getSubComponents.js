import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} subComponentName 
 */
export default function getSubComponts(subComponentName, context = [], modifier) {
    return [...this.DOMNodes].reduce((matches, node) => {
        let namespace = this.namespace || getModuleNamespace(node);

        if (context.length) {
            namespace = [namespace].concat(context, [subComponentName]).join(this.componentGlue);
        }

        const depth = namespace.split(this.componentGlue).length - 1;

        return matches.concat(...[...node.querySelectorAll(`[class*="${namespace}"]`)].filter(subComponent => {
            return [...subComponent.classList].some(className => {
                let namespaceMatch;

                if (modifier) {
                    namespaceMatch = className.indexOf(namespace) === 0 && className.indexOf(modifier) > -1;
                } else {
                    namespaceMatch = className.indexOf(namespace) === 0;
                }

                const depthMatch = (className.split(this.componentGlue).length - 1) === (context.length ? depth : depth + 1);

                return namespaceMatch && depthMatch;
            });
        }));
    }, []);
}