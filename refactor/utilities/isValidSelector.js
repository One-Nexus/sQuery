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