import getConfig from './utilities/getConfig';
import getDomNodes from './utilities/getDomNodes';
import getModuleNamespace from './utilities/getModuleNamespace';

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

    const namespace = getModuleNamespace(SynergyQuery);
    const DOMNodes = getDomNodes(SynergyQuery);
    const config = getConfig(defaults, custom, parser);

    const componentGlue = config.componentGlue || (window.Synergy && Synergy.componentGlue) || '_';
    const modifierGlue  = config.modifierGlue  || (window.Synergy && Synergy.modifierGlue)  || '-';

    for (let [key, method] of Object.entries(API)) {
        methods[key] = method.bind({ namespace, DOMNodes, componentGlue, modifierGlue });
    }

    if (typeof callback === 'function') {
        DOMNodes.forEach(node => callback(node, config));
    }

    return Object.assign(methods, { namespace, DOMNodes });
}