import getComponents from './getComponents';

/**
 * @param {*} componentName 
 */
export default function getComponent(componentName) {
    return [...this.DOMNodes].map(node => {
        return getComponents.bind(Object.assign(this, { DOMNodes: [node] }))(componentName)[0]
    });
}