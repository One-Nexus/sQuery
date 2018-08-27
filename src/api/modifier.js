import hasModifier from './hasModifier';
import addModifier from './addModifier';

/**
 * @param {String} modifier 
 * @param {(('is'|'set'|'unset')|Function)} operator 
 */
export default function modifier(modifier, operator) {
    if (!operator || operator === 'is') {
        return hasModifier.bind(this)(modifier);
    }

    if (operator === 'set') {
        return addModifier.bind(this)(modifier);
    }

    if (operator === 'unset') {
        
    }

    if (typeof operator === 'function') {

    }
}