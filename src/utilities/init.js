import BEMAPI from '../utilities/BEM-API';

export default function init(custom, API) {
    var Synergy = window.Synergy || {};

    API = API || this;

    const options = Object.assign({
        elementProto   : true,
        nodeListProto  : true,
        preset         : 'Synergy',
        Synergy        : true,
        componentGlue  : (typeof sQuery !== 'undefined') && Synergy.componentGlue   || '_',
        modifierGlue   : (typeof sQuery !== 'undefined') && Synergy.modifierGlue    || '-',
        multipleClasses: (typeof sQuery !== 'undefined') && Synergy.multipleClasses || false
    }, custom);

    if (options.preset === 'BEM') {
        options.componentGlue   = custom.componentGlue   || '__';
        options.modifierGlue    = custom.modifierGlue    || '--';
        options.multipleClasses = custom.multipleClasses || true;
        options.elementProto    = custom.elementProto    || false;
        options.nodeListProto   = custom.nodeListProto   || false;

        API = BEMAPI(API);
    }

    const { componentGlue, modifierGlue, multipleClasses } = options;

    if (options.Synergy) {
        window.Synergy = Synergy;

        Object.assign(window.Synergy, { componentGlue, modifierGlue, multipleClasses });
    }

    for (let entry of Object.entries(API)) {
        const key = entry[0], method = entry[1];

        if (options.elementProto) {
            if (Element.prototype[key] && Element.prototype[key].sQuery) {
                Element.prototype[key] = undefined;
            }

            if (typeof document.body[key] === 'undefined') {
                Element.prototype[key] = function(...params) {
                    return method.bind({
                        componentGlue, 
                        modifierGlue,
                        multipleClasses
                    })(this, ...params);
                }
                Element.prototype[key].sQuery = true;
            }
        }

        if (options.nodeListProto) {
            // @todo conditionally add this if not exists (and delete if previously added by sQuery)
            NodeList.prototype[key] = function(...params) {
                return method.bind({
                    componentGlue, 
                    modifierGlue,
                    multipleClasses
                })(this, ...params);
            }
            NodeList.prototype[key].sQuery = true;
        }
    }

    if (typeof sQuery !== 'undefined') {
        Object.assign(sQuery, { config: options, API });
    }
}