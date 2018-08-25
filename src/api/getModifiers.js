import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function getModifiers() {
    let matches = [];

    this.DOMNodes.forEach(node => {
        matches.push(...[...node.classList].filter(className => {
            return className.indexOf(this.namespace || getModuleNamespace(node)) === 0
        }).map(target => target.split(this.modifierGlue).slice(1))[0]);
    });

    return matches;
}