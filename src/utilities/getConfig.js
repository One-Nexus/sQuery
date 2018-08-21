import deepextend from 'deep-extend';

/**
 * @param {*} defaults 
 * @param {*} custom 
 * @param {*} parser 
 */
export default function getConfig(defaults, custom, parser) {
    const extendedConfig = deepextend(defaults, custom);

    if (typeof parser === 'function') {
        return parser(extendedConfig);
    }

    return extendedConfig;
}