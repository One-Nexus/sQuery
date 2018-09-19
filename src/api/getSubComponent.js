import getSubComponents from './getSubComponents';

/**
 * @param {*} subComponentName 
 */
export default function getComponent(subComponentName, context = []) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].map(() => {
            return getSubComponents.bind(this)(subComponentName, context)[0]
        });
    }

    return getSubComponents.bind(this)(subComponentName, context)[0];
}