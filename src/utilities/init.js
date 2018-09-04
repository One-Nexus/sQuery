import * as API from '../api';
import getModuleNamespace from './getModuleNamespace';

export default function init(custom) {
    const options = Object.assign({
        elementProto: true,
        nodeListProto: true,
        preset: 'Synergy',
        attachToWindow: true,
        alterMethodName: false
    }, custom);

    const PRESETS = {
        BEM: ['__', '--', 'block', 'element', 'modifier'],
        Synergy: ['_', '-', 'module', 'component', 'modifier']
    }

    const [componentGlue, modifierGlue, moduleNamespace, componentNamespace, modifierNamespace] = [
        ...PRESETS[options.preset]
    ];

    if (options.elementProto || options.nodeListProto) {
        for (let [key, method] of Object.entries(API)) {
            if (options.alterMethodName) {
                if (key.toLowerCase().indexOf(moduleNamespace) > -1) {
                    console.log(key);
                }

                if (key.toLowerCase().indexOf(componentNamespace) > -1) {
                    console.log(key);
                }

                if (key.toLowerCase().indexOf(modifierNamespace) > -1) {
                    console.log(key);
                }
            }

            if (options.elementProto) {
                Element.prototype[key] = function(...params) {
                    return method.bind({ 
                        namespace: getModuleNamespace(this), DOMNodes: [this], componentGlue, modifierGlue 
                    })(...params);
                }
            }

            if (options.nodeListProto) {
                NodeList.prototype[key] = function(...params) {
                    return method.bind({ 
                        namespace: getModuleNamespace(this[0]), DOMNodes: this, componentGlue, modifierGlue 
                    })(...params);
                }
            }
        }
    }

    if (options.attachToWindow) {
        // window.Synergy = window.Synergy || {};

        // window.Synergy.componentGlue = componentGlue;
        // window.Synergy.modifierGlue = modifierGlue;
    }
}