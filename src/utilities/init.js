import * as API from '../api';
import getModuleNamespace from './getModuleNamespace';

export default function init(custom) {
    const options = Object.assign({
        elementProto: true,
        nodeListProto: true,
        preset: 'Synergy',
        attachToWindow: true,
        alterMethodName: true
    }, custom);

    const PRESETS = {
        BEM: ['__', '--', 'block', 'element', 'modifier'],
        Synergy: ['_', '-', 'module', 'component', 'modifier']
    }

    const [componentGlue, modifierGlue, moduleNamespace, componentNamespace, modifierNamespace] = [
        ...PRESETS[options.preset]
    ];

    if ((options.elementProto || options.nodeListProto)) {
        for (let [key, method] of Object.entries(API)) {
            let methodName = key;
        
            if (options.alterMethodName) {
                const moduleUpperCase = moduleNamespace[0].toUpperCase() + moduleNamespace.substring(1);
                const componentUpperCase = componentNamespace[0].toUpperCase() + componentNamespace.substring(1);
                const modifierUpperCase = modifierNamespace[0].toUpperCase() + modifierNamespace.substring(1);

                if (methodName.toLowerCase().indexOf('module') > -1) {
                    methodName = methodName.replace(new RegExp('module', 'g'), moduleNamespace);
                }

                if (methodName.toLowerCase().indexOf('Module') > -1) {
                    methodName = methodName.replace(new RegExp('Module', 'g'), moduleUpperCase);
                }

                if (methodName.indexOf('component') > -1) {
                    methodName = methodName.replace(new RegExp('component', 'g'), componentNamespace);
                }

                if (methodName.indexOf('Component') > -1) {
                    methodName = methodName.replace(new RegExp('Component', 'g'), componentUpperCase);
                }

                if (methodName.toLowerCase().indexOf('modifier') > -1) {
                    methodName = methodName.replace(new RegExp('modifier', 'g'), modifierNamespace);
                }

                if (methodName.toLowerCase().indexOf('Modifier') > -1) {
                    methodName = methodName.replace(new RegExp('Modifier', 'g'), modifierUpperCase);
                }
            }

            if (typeof document.body[methodName] === 'undefined') {
                if (options.elementProto) {
                    Element.prototype[methodName] = function(...params) {
                        return method.bind({ 
                            namespace: getModuleNamespace(this, componentGlue, modifierGlue), DOMNodes: [this], componentGlue, modifierGlue 
                        })(...params);
                    }
                }

                if (options.nodeListProto) {
                    NodeList.prototype[methodName] = function(...params) {
                        return method.bind({ 
                            namespace: getModuleNamespace(this[0], componentGlue, modifierGlue), DOMNodes: this, componentGlue, modifierGlue 
                        })(...params);
                    }
                }
            }
        }
    }

    if (options.attachToWindow) {
        window.Synergy = Synergy || {};

        Object.assign(Synergy, { componentGlue, modifierGlue });
    }
}