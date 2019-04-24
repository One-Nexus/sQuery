import getConfig from './utilities/getConfig';
import getDomNodes from './utilities/getDOMNodes';
import getNamespace from './utilities/getNamespace';
import init from './utilities/init';

import * as API from './api';

// spoof env process to assist bundle size
if (typeof process === 'undefined') window.process = { env: {} };

/** */
function sQuery(SynergyQuery, callback, defaults, custom, parser) {
    var Synergy = window.Synergy || {};

    sQuery.config = sQuery.config || {};

    const methods = {};
    const config = getConfig(defaults, custom, parser);

    const modifierGlue    = config.modifierGlue    || Synergy.modifierGlue    || '-';
    const componentGlue   = config.componentGlue   || Synergy.componentGlue   || '_';
    const multipleClasses = config.multipleClasses || Synergy.multipleClasses || false;

    const namespace = getNamespace(SynergyQuery, false, { componentGlue, modifierGlue });
    const DOMNodes = getDomNodes(SynergyQuery);

    for (let [key, method] of Object.entries(API)) {
        if (sQuery.config.methods && sQuery.config.methods[key]) {
            key = sQuery.config.methods[key];
        }

        const internalConfig = { namespace, componentGlue, modifierGlue, multipleClasses };

        if (DOMNodes) {
            methods[key] = method.bind(internalConfig, DOMNodes);
        } else {
            methods[key] = method.bind(internalConfig);
        }
    }

    if (typeof callback === 'function') {
        DOMNodes.forEach(node => callback(node, config));
    }

    return Object.assign(methods, { 
        namespace, 
        nodes: DOMNodes,
        node: DOMNodes ? DOMNodes[0] : null
    });
}

sQuery.init = init;

for (let [key, method] of Object.entries(API)) {
    sQuery[key] = method;
}

if (typeof window !== 'undefined') {
    window.sQuery = sQuery;
}

export default sQuery;