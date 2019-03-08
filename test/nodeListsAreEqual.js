/**
 * Determine whether two NodeLists are equal
 */
export default function nodeListsAreEqual(actual, expected) {
    if ((actual.length || Object.keys(actual).length) !== (expected.length || Object.keys(expected).length)) {
        return false;
    }

    return Array.from(actual).every(actualNode => {
        return Array.from(expected).some(expectedNode => actualNode === expectedNode)
    });
}