import getConfig from './utilities/getConfig';
import getDomNodes from './utilities/getDomNodes';
import getModuleNamespace from './utilities/getModuleNamespace';
import init from './utilities/init';

import * as API from './api';

import {
    add,
    addModifier,
    component,
    components,
    find,
    getComponent,
    getComponents,
    getModifiers,
    getSubComponent,
    getSubComponents,
    has,
    hasModifier,
    is,
    isComponent,
    modifier,
    removeModifier,
    parent,
    parentComponent,
    setComponent,
    subComponent,
    subComponents,
    unsetComponent,
} from './api';

// spoof env process to assist bundle size
if (typeof process === 'undefined') window.process = { env: {} };

/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */
export default function sQuery(SynergyQuery, callback, defaults, custom, parser) {
    var Synergy = window.Synergy || {};

    const methods = {};
    const config = getConfig(defaults, custom, parser);

    const modifierGlue  = config.modifierGlue  || Synergy.modifierGlue  || '-';
    const componentGlue = config.componentGlue || Synergy.componentGlue || '_';

    const namespace = getModuleNamespace(SynergyQuery, componentGlue, modifierGlue);
    const DOMNodes = getDomNodes(SynergyQuery);

    for (let [key, method] of Object.entries(API)) {
        methods[key] = method.bind({ namespace, DOMNodes, componentGlue, modifierGlue });
    }

    if (typeof callback === 'function') {
        if (DOMNodes instanceof NodeList) {
            DOMNodes.forEach(node => callback(node, config));
        } else {
            callback(node, DOMNodes);
        }
    }

    return Object.assign(methods, { 
        namespace, 
        DOMNodes,
        DOMNode: DOMNodes ? DOMNodes[0] : null
    });
}

sQuery.init = init;

for (let [key, method] of Object.entries(API)) {
    sQuery[key] = method;
}

if (typeof window !== 'undefined') {
    window.sQuery = sQuery;
}

export {
    add,
    addModifier,
    component,
    components,
    find,
    getComponent,
    getComponents,
    getModifiers,
    getSubComponent,
    getSubComponents,
    has,
    hasModifier,
    is,
    isComponent,
    modifier,
    removeModifier,
    parent,
    parentComponent,
    setComponent,
    subComponent,
    subComponents,
    unsetComponent,
};