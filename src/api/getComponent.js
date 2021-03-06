import getComponents from './getComponents';

/**
 * @TODO allow this API
 * const [title, content] = panel.getComponent(['title', 'content']);
 */
export default function getComponent(node, componentName, config) {
    config = Object.assign(this || {}, config || {});

    if (node instanceof NodeList || node instanceof Array) {
        return [].slice.call(node).map(node => getComponent(node, componentName, config));
    };

    return getComponents(node, componentName, config)[0]
}