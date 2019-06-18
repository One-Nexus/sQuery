import getNamespace from '../utilities/getNamespace';

export default function parentModule(node, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return [].slice.call(node).map(node => parentModule(node, config));
    }

    const namespace = config.namespace || getNamespace(node, false, config);
    const target = node.closest(`.${namespace}, [class*='${namespace + config.modifierGlue}']`);

    return sQuery.config.elementProto ? target : sQuery(target);
}