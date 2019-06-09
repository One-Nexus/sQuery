export default function init(custom, API) {
    API = API || this;

    var Synergy = window.Synergy || {};

    const options = Object.assign({
        elementProto: true,
        nodeListProto: true,
        preset: 'Synergy',
        Synergy: true,
        alterMethodName: ['sQuery'],
        componentGlue: (typeof sQuery !== 'undefined') && Synergy.componentGlue,
        modifierGlue: (typeof sQuery !== 'undefined') && Synergy.modifierGlue,
        multipleClasses: (typeof sQuery !== 'undefined') && Synergy.multipleClasses
    }, custom);

    options.alterMethodName = options.alterMethodName || [];

    const PRESETS = {
        BEM: ['__', '--', 'block', 'element', 'modifier', true],
        Synergy: ['_', '-', 'module', 'component', 'modifier', false]
    }

    let [
        componentGlue, 
        modifierGlue, 
        moduleNamespace, 
        componentNamespace, 
        modifierNamespace, 
        multipleClasses
    ] = [].slice.call(PRESETS[options.preset]);

    componentGlue = options.componentGlue || componentGlue;
    modifierGlue = options.modifierGlue || modifierGlue;
    multipleClasses = typeof options.multipleClasses === 'undefined' ? multipleClasses : options.multipleClasses;

    if (options.Synergy) {
        window.Synergy = Synergy;

        Object.assign(window.Synergy, { componentGlue, modifierGlue, multipleClasses });
    }

    const methods = {};

    for (let entry of Object.entries(API)) {
        const key = entry[0], method = entry[1];

        let methodName = key, newMethodName;
    
        if (options.alterMethodName.length) {
            const moduleUpperCase = moduleNamespace[0].toUpperCase() + moduleNamespace.substring(1);
            const componentUpperCase = componentNamespace[0].toUpperCase() + componentNamespace.substring(1);
            const modifierUpperCase = modifierNamespace[0].toUpperCase() + modifierNamespace.substring(1);
    
            if (methodName.indexOf('module') > -1) {
                newMethodName = methodName.replace(new RegExp('module', 'g'), moduleNamespace);
            }

            if (methodName.indexOf('Module') > -1) {
                newMethodName = methodName.replace(new RegExp('Module', 'g'), moduleUpperCase);
            }

            if (methodName.indexOf('component') > -1) {
                newMethodName = methodName.replace(new RegExp('component', 'g'), componentNamespace);
            }

            if (methodName.indexOf('Component') > -1) {
                newMethodName = methodName.replace(new RegExp('Component', 'g'), componentUpperCase);
            }

            // @TODO do modifier renames

            if (options.preset !== 'Synergy' && sQuery && options.alterMethodName.includes('sQuery')) {
                sQuery[newMethodName] = function(node, ...params) {
                    return this(node)[methodName](...params);
                }
            }

            methods[methodName] = newMethodName || methodName;
        }

        if (options.elementProto) {
            methodName = options.alterMethodName.includes('elementProto') ? newMethodName : methodName;

            if (Element.prototype[methodName] && Element.prototype[methodName].sQuery) {
                Element.prototype[methodName] = undefined;
            }

            if (typeof document.body[methodName] === 'undefined') {
                Element.prototype[methodName] = function(...params) {
                    return method.bind({
                        componentGlue, 
                        modifierGlue,
                        multipleClasses
                    })(this, ...params);
                }
                Element.prototype[methodName].sQuery = true;
            }
        }

        if (options.nodeListProto) {
            methodName = options.alterMethodName.includes('nodeListProto') ? newMethodName : methodName;

            // @todo conditionally add this if not exists (and delete if previously added by sQuery)

            NodeList.prototype[methodName] = function(...params) {
                return method.bind({
                    componentGlue, 
                    modifierGlue,
                    multipleClasses
                })(this, ...params);
            }
            NodeList.prototype[methodName].sQuery = true;
        }
    }

    if (typeof sQuery !== 'undefined') {
        sQuery.config = Object.assign(options, { methods });
    }
}