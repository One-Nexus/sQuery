import * as API from '../api';

export default function init(custom) {
    const options = Object.assign({
        elementProto: true,
        nodeListProto: true,
        preset: 'Synergy',
        Synergy: true,
        alterMethodName: ['sQuery']
    }, custom);

    options.alterMethodName = options.alterMethodName || [];

    const PRESETS = {
        BEM: ['__', '--', 'block', 'element', 'modifier'],
        Synergy: ['_', '-', 'module', 'component', 'modifier']
    }

    let [
        componentGlue, 
        modifierGlue, 
        moduleNamespace, 
        componentNamespace,
        modifierNamespace
    ] = [].slice.call(PRESETS[options.preset]);

    componentGlue = options.componentGlue || componentGlue;
    modifierGlue  = options.modifierGlue  || modifierGlue;

    if (options.Synergy) {
        window.Synergy = window.Synergy || {};

        Object.assign(window.Synergy, { componentGlue, modifierGlue });
    }

    const methods = {};

    for (let [key, method] of Object.entries(API)) {
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

            if (typeof document.body[methodName] === 'undefined') {
                Element.prototype[methodName] = function(...params) {
                    return method.bind({
                        componentGlue, 
                        modifierGlue 
                    })(this, ...params);
                }
            }
        }

        if (options.nodeListProto) {
            methodName = options.alterMethodName.includes('nodeListProto') ? newMethodName : methodName;

            NodeList.prototype[methodName] = function(...params) {
                return method.bind({
                    componentGlue, 
                    modifierGlue 
                })(this, ...params);
            }
        }
    }

    if (typeof sQuery !== 'undefined') {
        sQuery.config = Object.assign(options, { methods });
    }
}