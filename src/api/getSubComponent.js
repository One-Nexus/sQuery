import getSubComponents from './getSubComponents';

/**
 * @param {*} subComponentName 
 */
export default function getComponent(subComponentName, context = []) {
    return [...this.DOMNodes].map(() => {
        return getSubComponents.bind(this)(subComponentName, context)[0]
    });
}