import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {*} componentName 
 */
export default function getModifiers() {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].reduce((matches, DOMNodes) => {
            return matches.concat(...getModifiers.bind(Object.assign(this, { DOMNodes }))());
        }, []);
    }

    return [].concat(...[...this.DOMNodes.classList].filter(className => {
        return className.indexOf(this.namespace || getModuleNamespace(this.DOMNodes, this.componentGlue, this.modifierGlue)) === 0
    }).map(target => target.split(this.modifierGlue).slice(1)));
}