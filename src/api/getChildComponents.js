import getComponents from '../utilities/getComponents';

/**
 * @param {*} componentName 
 */
export default function getChildComponents(componentName) {
    let matches = [];

    this.DOMNodes.forEach(node => {
        matches.push(...getComponents(this, componentName))
    });

    return matches;
}