import isValidSelector from './utilities/isValidSelector';

import * as API from './api';

/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */
export default function Synergy(SynergyQuery, callback, defaults, custom, parser) {
    const methods = {};
    const nameSpace = getModuleNamespace(SynergyQuery);
    const DOMNodes = getDomNodes(SynergyQuery);
    const config = getConfig(defaults, custom, parser);
    const componentGlue = '_';
    const modifierGlue = '-';
    
    for (let [key, method] of Object.entries(API)) {
        methods[key] = method.bind(DOMNodes);
    }

    if (typeof callback === 'function') {
        DOMNodes.forEach(node => callback(node, config));
    }

    return methods;
}

function getModuleNamespace(query) {
    if (typeof query === 'string' && query.match(`^[a-zA-Z0-9_-]+$`)) {
        return query;
    }

    if (typeof query === 'object' && 'name' in query) {
        return query.name;
    }
}

function getDomNodes(query) {
    if (query instanceof HTMLElement || query instanceof NodeList) {
        return query;
    }

    if (typeof query === 'string') {
        if (isValidSelector(query) && document.querySelectorAll(query).length) {
            return document.querySelectorAll(query);
        }
    }
}

function getConfig(defaults, custom, parser) {
    const extendedConfig = deepextend(defaults, custom);

    if (typeof parser === 'function') {
        return parser(extendedConfig);
    }

    return extendedConfig;
}