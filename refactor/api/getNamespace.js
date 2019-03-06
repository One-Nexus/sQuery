export default function getNamespace(query, strict, config) {
    config = config || this;

    const { modifierGlue, componentGlue } = config;

    if (query instanceof HTMLElement) {
        if (query.hasAttribute('data-module')) {
            return query.getAttribute('data-module');
        }

        if (query.classList.length) {
            if (strict) {
                return query.classList[0].split(modifierGlue)[0];
            }

            return query.classList[0].split(modifierGlue)[0].split(componentGlue)[0];
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