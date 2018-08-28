/**
 * @param {*} componentName 
 */
export default function parentComponent(componentName) {
    return [...this.DOMNodes].map(node => node.parentNode.closest(`[data-component="${componentName}"]`));
}