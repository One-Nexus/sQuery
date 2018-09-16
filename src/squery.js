import getConfig from './utilities/getConfig';
import getDomNodes from './utilities/getDomNodes';
import getModuleNamespace from './utilities/getModuleNamespace';
import init from './utilities/init';

import * as API from './api';

/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */
export default function sQuery(SynergyQuery, callback, defaults, custom, parser) {
    const methods = {};
    const config = getConfig(defaults, custom, parser);

    const componentGlue = config.componentGlue || (window.Synergy && Synergy.componentGlue) || '_';
    const modifierGlue  = config.modifierGlue  || (window.Synergy && Synergy.modifierGlue)  || '-';

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