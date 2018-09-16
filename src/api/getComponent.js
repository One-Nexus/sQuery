import getComponents from './getComponents';

/**
 * @param {*} componentName 
 */
export default function getComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].map(DOMNodes => {
            return getComponent.bind(Object.assign(this, { DOMNodes }))(componentName);
        });
    };

    return getComponents.bind(this)(componentName)[0]
}