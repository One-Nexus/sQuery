import getModifiers from './getModifiers';

/**
 * @param {*} modifier 
 */
export default function hasModifier(modifier) {
    return [...this.DOMNodes].every(node => {
        return getModifiers.bind(Object.assign(this, { DOMNodes: [node] }))().includes(modifier)
    })
}