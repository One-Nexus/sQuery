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
        // try for module

        // try for component
    }
}