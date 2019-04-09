import getNamespace from '../api/getNamespace';
import parent from '../api/parent';

export default function filterElements(node, elements, subComponent, config) {
    const namespace = config.namespace || getNamespace(node, subComponent, config);

    const sourceParent = parent(node, namespace, config);

    if (!sourceParent) return elements;

    elements = [].slice.call(elements).filter(element => {
        const targetParent = parent(element, namespace, config);

        if (!targetParent) {
            return true;
        }

        return targetParent === sourceParent;
    });

    return elements;
}