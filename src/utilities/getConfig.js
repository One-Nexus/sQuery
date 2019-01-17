/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
export default function getConfig(defaults, custom, parser) {
    let extendedConfig;

    if (typeof deepExtend === 'function' && (typeof process !== 'undefined' && process.env.SYNERGY)) {
        extendedConfig = deepExtend(defaults, custom);
    } else {
        extendedConfig = require('deep-extend')(defaults, custom);
    }

    if (typeof parser === 'function') {
        return parser(extendedConfig);
    }

    return extendedConfig;
}