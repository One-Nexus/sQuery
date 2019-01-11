/**
 * Test the validity (not existance) of a CSS selector
 * 
 * @param {String} selector - the selector to test for validity
 * 
 * @returns {Bool}
 * 
 * @example isValidSelector('[data-foo-bar]') // returns true
 * @example isValidSelector(4) // returns false
 */
export default function isValidSelector(selector) {
    if (!selector || typeof selector !== 'string') return false;

    var stub = document.createElement('br');
    stub.textContent = 'Hello!';
    
    try {
        selector && stub.querySelector(selector); 
    } catch(e) { 
        return false; 
    }

    return true;
}