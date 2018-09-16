import isValidSelector from './isValidSelector';

/**
 * Find matching DOM nodes against passed Synergy query
 * 
 * @param {*} query 
 */
export default function getDomNodes(query) {
    if (query instanceof NodeList) {
        return query;
    }

    if (query instanceof HTMLElement) {
        return query;
    }

    if (query instanceof Array) {
        return getDomNodes(query[0]);
    }

    if (isValidSelector(query) && document.querySelectorAll(query).length) {
        return document.querySelectorAll(query);
    }

    if (typeof query === 'object' && query.name) {
        return getDomNodes(query.name);
    }

    if (typeof query === 'string' && query.match(`^[a-zA-Z0-9_-]+$`)) {
        return document.querySelectorAll(`.${query}, [class*="${query}-"]`);
    }
}