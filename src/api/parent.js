import getModuleNamespace from '../utilities/getModuleNamespace';

/**
 * @param {(String|'module'|'component')} query 
 */
export default function parent(query, namespace) {
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
                return [...nodes].map(node => moduleMatch(node));
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
            namespace = namespace || getModuleNamespace(nodes, this.componentGlue, this.modifierGlue, 'strict');

            let parentModule, selector;

            if (nodes instanceof NodeList) {
                return [...nodes].map(node => componentMatch(node));
            }
  
            parentModule = nodes.parentNode.closest(`[data-component="${query}"]`);

            if (parentModule) {
                return parentModule;
            }

            parentModule = nodes.parentNode.closest(`.${namespace + this.componentGlue + query}`);

            if (parentModule) {
                return parentModule;
            }

            selector = `[class*="${namespace + this.componentGlue}"][class*="${this.componentGlue + query}"]`;
            parentModule = nodes.parentNode.closest(selector);

            if (parentModule) {
                return parentModule;
            }
        };

        if (this.DOMNodes instanceof HTMLElement) {
            return moduleMatch() || componentMatch();
        }

        return moduleMatch()[0] ? moduleMatch() : componentMatch();
    }
}