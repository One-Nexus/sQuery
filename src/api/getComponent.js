import getComponents from './getComponents';

/**
 * @TODO allow this API
 * const [title, content] = panel.getComponent(['title', 'content']);
 */

/**
 * @param {*} componentName 
 */
export default function getComponent(componentName) {
    if (this.DOMNodes instanceof NodeList) {
        return Array.prototype.slice.call(this.DOMNodes).map(DOMNodes => {
            return getComponent.bind(Object.assign(this, { DOMNodes }))(componentName);
        });
    };

    return getComponents.bind(this)(componentName)[0]
}