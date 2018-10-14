import getModuleNamespace from '../utilities/getModuleNamespace';

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
            let parentModule;

            if (nodes instanceof NodeList) {
                // @TODO recurse parent function instead of duplicating logic
                return [...nodes].map(node => node.parentNode.closest(`[data-module="${query}"]`));
            }

            parentModule = nodes.parentNode.closest(`[data-module="${query}"]`);

            if (parentModule) {
                return parentModule;
            }

            parentModule = nodes.closest(`.${query}, [class*="${query + this.modifierGlue}"]`);

            if (parentModule && getModuleNamespace(parentModule, this.componentGlue, this.modifierGlue, 'strict') === query) {
                return parentModule;
            }
        };

        const componentMatch = (nodes = this.DOMNodes) => {
            if (nodes instanceof NodeList) {
                // @TODO recurse parent function instead of duplicating logic
                return [...nodes].map(node => node.parentNode.closest(`[data-component="${query}"]`))
            }

            // @TODO similar to moduleMatch, also test selector string query
  
            return nodes.parentNode.closest(`[data-component="${query}"]`);
        };

        if (this.DOMNodes instanceof HTMLElement) {
            return moduleMatch() || componentMatch();
        }

        return moduleMatch()[0] ? moduleMatch() : componentMatch();
    }
}