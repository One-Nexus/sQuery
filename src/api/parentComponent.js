/**
 * @param {*} componentName 
 */
export default function parentComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return [...this.DOMNodes].map(node => node.parentNode.closest(`[data-component="${componentName}"]`));
    }

    return this.DOMNodes.parentNode.closest(`[data-component="${componentName}"]`);
}