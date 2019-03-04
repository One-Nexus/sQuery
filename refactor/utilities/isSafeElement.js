export default function isSafeElement(node, namespace, { modifierGlue }) {
    const matchedClasses = [].slice.call(node.classList).filter(className => {
        const conditions = [
            className === namespace,
            className.indexOf(namespace + modifierGlue) === 0
        ];

        return conditions.some(condition => !!condition);
    });

    return matchedClasses.length === 1 ? matchedClasses[0] : false;
}