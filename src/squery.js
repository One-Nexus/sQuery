import getConfig from './utilities/getConfig';
import getDomNodes from './utilities/getDOMNodes';
import getNamespace from './utilities/getNamespace';

/** */
function sQuery(SynergyQuery, callback, defaults, custom, parser, API) {
    API = API || sQuery.API;

    var Synergy = window.Synergy || {};

    sQuery.config = sQuery.config || {};

    const methods = {};
    const config = getConfig(defaults, custom, parser);

    const modifierGlue    = config.modifierGlue    || Synergy.modifierGlue    || '-';
    const componentGlue   = config.componentGlue   || Synergy.componentGlue   || '_';
    const multipleClasses = config.multipleClasses || Synergy.multipleClasses || false;

    const namespace = getNamespace(SynergyQuery, true, { componentGlue, modifierGlue });
    const DOMNodes = getDomNodes(SynergyQuery);

    for (let entry of Object.entries(API)) {
        const key = entry[0], method = entry[1];
        const internalConfig = { componentGlue, modifierGlue, multipleClasses };

        if (DOMNodes && (DOMNodes.length || DOMNodes instanceof HTMLElement)) {
            methods[key] = method.bind(internalConfig, DOMNodes);
        } else {
            methods[key] = method.bind(internalConfig);
        }
    }

    if (typeof callback === 'function') {
        DOMNodes.forEach(node => callback(node, config));
    }

    const nodes = Array.from(DOMNodes instanceof HTMLElement ? [DOMNodes] : DOMNodes);

    return Object.assign(DOMNodes, methods, { 
        namespace, 
        nodes,
        node: nodes[0]
    });
}

export default sQuery;