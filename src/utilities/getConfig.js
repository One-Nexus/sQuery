/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
export default function getConfig(defaults, custom, parser) {
    let extendedConfig;

    // `process` and `require` are exploited to help reduce bundle size
    if (process.env.SYNERGY) {
        extendedConfig = Synergy.config(defaults, custom);
    }
    else if (typeof Synergy !== 'undefined' && typeof Synergy.config === 'function') {
        extendedConfig = Synergy.config(defaults, custom);
    } 
    else {
        extendedConfig = require('deep-extend')(defaults, custom);
    }

    if (typeof parser === 'function') {
        return parser(extendedConfig);
    }

    return extendedConfig;
}