import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function getModifiers() {
    let matches = [];

    // @TODO return a single array rather than an array of arrays
    this.DOMNodes.forEach(node => {
        matches.push(...[...node.classList].filter(className => {
            return className.indexOf(this.namespace || getModuleNamespace(node)) === 0
        }).map(target => target.split(this.modifierGlue).slice(1)));
    });
    
    return [].concat(...matches);
}