import getNamespace from '../api/getNamespace';
import parent from '../api/parent';

export default function filterElements(node, elements, config) {
    const namespace = config.namespace || getNamespace(node, config, true);

    const sourceParent = parent(node, namespace, config);

    elements = [].slice.call(elements).filter(element => {
        const targetParent = parent(element, namespace, config);

        return targetParent === sourceParent;
    });

    return elements;
}