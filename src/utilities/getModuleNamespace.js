import isValidSelector from './isValidSelector';

/**
 * Get the Module name from a Synergy query
 * 
 * @param {*} query 
 */
export default function getModuleNamespace(query) {
    if (typeof query === 'string' && query.match(`^[a-zA-Z0-9_-]+$`)) {
        return query;
    }

    if (typeof query === 'object' && 'name' in query) {
        return query.name;
    }

    if (query instanceof HTMLElement) {
        if (query.closest('[data-module]')) {
            return query.closest('[data-module]').getAttribute('data-module');
        }

        return query.classList[0].split(/-(.+)/)[0];
    }
}