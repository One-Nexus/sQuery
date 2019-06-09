import getConfig from './utilities/getConfig';
import getDomNodes from './utilities/getDOMNodes';
import getNamespace from './utilities/getNamespace';

/** */
function sQuery(SynergyQuery, callback, defaults, custom, parser, API) {
    API = API || this;

    var Synergy = window.Synergy || {};

    sQuery.config = sQuery.config || {};

    const methods = {};
    const config = getConfig(defaults, custom, parser);

    const modifierGlue    = config.modifierGlue    || Synergy.modifierGlue    || '-';
    const componentGlue   = config.componentGlue   || Synergy.componentGlue   || '_';
    const multipleClasses = config.multipleClasses || Synergy.multipleClasses || false;

    const namespace = getNamespace(SynergyQuery, false, { componentGlue, modifierGlue });
    const DOMNodes = getDomNodes(SynergyQuery);

    for (let entry of Object.entries(API)) {
        const key = entry[0], method = entry[1];

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

export default sQuery;