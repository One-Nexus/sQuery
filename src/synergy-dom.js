import * as API from './api';

/**
 * @param {*} SynergyQuery
 * @param {Function} [callback]
 * @param {Object} [defaults]
 * @param {Object} [custom]
 * @param {Object} [parser]
 */
export default function Synergy(SynergyQuery, callback, defaults, custom, parser) {
    const methods = {
        add,
        addModifier,
        component,
        find,
        getChildComponent,
        getChildComponents,
        getModifiers,
        has,
        hasModifier,
        is,
        isComponent,
        modifier,
        parent,
        parentComponent,
        query,
        remove,
        removeModifiers,
        setComponent,
        unsetComponent
    };

    methods.add = (elements, modifier) => {
        
    }

    return methods;
}