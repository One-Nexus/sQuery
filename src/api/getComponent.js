import getComponents from './getComponents';

/**
 * @param {*} componentName 
 */
export default function getComponent(componentName) {
    return [...this.DOMNodes].map(() => {
        return getComponents.bind(this)(componentName)[0]
    });
}