export default function getModules(node, moduleName, config) {
    config = Object.assign(this || {}, config || {});

    const { modifierGlue } = config;

    if (node instanceof NodeList || node instanceof Array) {
        const matchedModules = [].slice.call(node).reduce((matches, node) => {
            const modules = [].slice.call(getModules(node, moduleName, config));

            matches = matches.filter(match => modules.every(module => module !== match));

            return matches.concat(modules);
        }, []);

        return matchedModules;
    }

    const potentialModules = node.querySelectorAll(`.${moduleName}, [class*="${moduleName + modifierGlue}"]`);

    const modules = [].slice.call(potentialModules).filter(potentialModule => {
        return [].slice.call(potentialModule.classList).some(className => {
            return className.indexOf(moduleName) === 0;
        });
    });

    return sQuery.config.elementProto ? modules : sQuery(modules);
}