/**
 * Get the Module name from a Synergy query
 * 
 * @param {*} query 
 * @param {Bool} strict
 */
export default function getModuleNamespace(query, componentGlue, modifierGlue, strict = false) {
    if (query instanceof HTMLElement) {
        if (query.hasAttribute('data-module')) {
            return query.getAttribute('data-module');
        }

        if (query.classList.length) {
            if (strict) {
                return query.classList[0].split(modifierGlue)[0].split(componentGlue)[0];
            }

            return query.classList[0].split(modifierGlue)[0];
        }
    }

    if (typeof query === 'string' && query.match(`^[a-zA-Z0-9_-]+$`)) {
        return query;
    }

    if (typeof query === 'object' && 'name' in query) {
        return query.name;
    }

    if (query.constructor === Array) {
        return query[1];
    }
}