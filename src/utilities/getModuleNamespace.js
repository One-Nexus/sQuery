/**
 * Get the Module name from a Synergy query
 * 
 * @param {*} query 
 * @param {Bool} strict
 */
export default function getModuleNamespace(query, strict = false) {
    if (typeof query === 'string' && query.match(`^[a-zA-Z0-9_-]+$`)) {
        return query;
    }

    if (typeof query === 'object' && 'name' in query) {
        return query.name;
    }

    if (query instanceof HTMLElement) {
        // @TODO this returns the `strict` value when it shouldn't
        // if (query.closest('[data-module]')) {
        //     return query.closest('[data-module]').getAttribute('data-module');
        // }

        if (query.classList.length) {
            if (strict) {
                return query.classList[0].split(/-(.+)/)[0].split(/_(.+)/)[0];
            }

            return query.classList[0].split(/-(.+)/)[0];
        }
    }
}