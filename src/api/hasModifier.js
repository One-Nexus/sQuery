import getModifiers from './getModifiers';

/**
 * @param {*} modifier 
 */
export default function hasModifier(modifier) {
    if (modifier) {
        if (modifier.constructor === Array) {
            return modifier.every(_modifier => hasModifier.bind(this)(_modifier));
        }

        return [...this.DOMNodes].every(node => {
            return getModifiers.bind(Object.assign(this, { DOMNodes: [node] }))().includes(modifier)
        });
    }
}