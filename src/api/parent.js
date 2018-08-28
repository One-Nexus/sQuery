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
        const moduleMatch = [...this.DOMNodes].map(node => node.parentNode.closest(`[data-module="${query}"]`));
        const componentMatch = [...this.DOMNodes].map(node => node.parentNode.closest(`[data-component="${query}"]`));

        return moduleMatch[0] ? moduleMatch : componentMatch;
    }
}