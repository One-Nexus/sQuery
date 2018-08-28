import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} subComponentName 
 */
export default function getSubComponts(subComponentName, context = []) {
    return [...this.DOMNodes].reduce((matches, node) => {
        const namespace = this.namespace || getModuleNamespace(node);
        const query = [namespace].concat(context, [subComponentName]).join(this.componentGlue);

        return matches.concat(...node.querySelectorAll(`.${query}, [class*="${query + this.modifierGlue}"]`));
    }, []);
}