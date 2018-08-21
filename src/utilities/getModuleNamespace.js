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

    if (isValidSelector(query) && document.querySelector(query).length) {
        if (document.querySelector(query).hasAttribute('data-module')) {
            return document.querySelector(query).getAttribute('data-module');
        }
    }

    if (query instanceof HTMLElement) {
        console.log(query);
    }
}