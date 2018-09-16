/**
 * @param {(String|'module'|'component')} query 
 */
export default function parent(query) {
    if (query === 'module') {
        return [...this.DOMNodes].map(node => node.parentNode.closest('[data-module]'));
    }

    if (query === 'component') {
        return [...this.DOMNodes].map(node => node.parentNode.closest('[data-component]'));
    }

    if (typeof query === 'string') {
        const moduleMatch = (nodes = this.DOMNodes) => {
            if (nodes instanceof NodeList) {
                return [...nodes].map(node => node.parentNode.closest(`[data-module="${query}"]`))
            } else {
                return nodes.parentNode.closest(`[data-module="${query}"]`);
            }
        };

        const componentMatch = (nodes = this.DOMNodes) => {
            if (nodes instanceof NodeList) {
                return [...nodes].map(node => node.parentNode.closest(`[data-component="${query}"]`))
            } else {
                return nodes.parentNode.closest(`[data-component="${query}"]`);
            }
        };

        if (this.DOMNodes instanceof HTMLElement) {
            return moduleMatch() || componentMatch();
        } else {
            return moduleMatch()[0] ? moduleMatch() : componentMatch();
        }
    }
}