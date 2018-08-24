import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {String} modifier 
 * @param {(('find'|'is'|'set'|'unset')|Function)} operator 
 */
export default function component(modifier, operator) {
    if (!modifier && !operator) {
        let matches = [];

        this.DOMNodes.forEach(node => {
            const namespace = this.namespace || getModuleNamespace(node);

            matches.push(...[...node.querySelectorAll(`[class*="${namespace}_"]`)].filter(component => {
                return ([...component.classList].filter(className => {
                    return className.indexOf(`${namespace}_`) === 0;
                })[0].match(/_/g) || []).length === 1;
            }));
        });

        return Object.assign({}, matches);;
    }

    return;
}