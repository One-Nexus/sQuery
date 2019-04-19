export default function getNamespace(query, strict, config) {
    config = Object.assign(this || {}, config || {});

    const { namespace, modifierGlue, componentGlue } = config;

    if (query instanceof HTMLElement) {
        if (query.hasAttribute('data-module')) {
            return query.getAttribute('data-module');
        }

        if (query.classList.length) {
            let targetClass;
            
            if (namespace) {
                targetClass = [].slice.call(query.classList).filter(className => {
                    return className.indexOf(namespace) === 0;
                })[0];
            }
            
            if (!namespace || !targetClass) {
                targetClass = query.classList[0];
            }

            if (strict) {
                return targetClass.split(modifierGlue)[0];
            }

            return targetClass.split(modifierGlue)[0].split(componentGlue)[0];
        }

        if (namespace) {
            return namespace;
        }
    }

    if (typeof query === 'string' && query.match(`^[a-zA-Z0-9_-]+$`)) {
        return query;
    }

    if (query && typeof query === 'object' && query.name) {
        return query.name;
    }

    if (query && query.constructor === Array) {
        return query[1];
    }
}