/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
export default function getConfig(defaults, custom, parser) {
    let extendedConfig;

    if (typeof deepExtend !== 'undefined') {
        extendedConfig = deepExtend(defaults, custom);
    }
    else {
        import('deep-extend').then((deepExtend) => {
            extendedConfig = deepExtend(defaults, custom);
        });
    }

    if (typeof parser === 'function') {
        return parser(extendedConfig);
    }

    return extendedConfig;
}