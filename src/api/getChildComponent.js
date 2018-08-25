import getComponents from '../utilities/getComponents';

/**
 * @param {*} componentName 
 */
export default function getChildComponent(componentName) {
    let matches = [];

    this.DOMNodes.forEach(node => {
        matches.push(getComponents(this, componentName)[0])
    });

    return matches;
}