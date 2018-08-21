import assert from 'assert';
import jsdom from 'jsdom-global';
import SynergyDOM from '../src/synergy-dom';

jsdom();

describe('SynergyDOM function', () => {
    it('should exist', () => {
        assert.equal(typeof SynergyDOM, 'function');
    });

    it('should expose method APIs', () => {
        assert.equal(typeof SynergyDOM().add, 'function');
    });

    describe('when invoked with `SynergyQuery` parameter', () => {
        beforeEach('setup dummy elements', () => {
            const stub = document.createElement('div');

            stub.innerHTML = (`
                <div class="foo" id="alpha"></div>
                <div class="foo-bar" id="beta"></div>
                <div class="fizz" id="gamma"></div>
                <div class="fizz-buzz" id="delta"></div>
            `);

            document.body.appendChild(stub);
        });
    
        afterEach('clean the document', () => {
            document.body.innerHTML = '';
        });
        
        describe('as a Module name', () => {
            it('should return all DOM elements that match the module name', () => {
                assert([...SynergyDOM('foo').DOMNodes].every((node, index) => {
                    return Array.from(document.querySelectorAll('.foo, [class*="foo-"]')).indexOf(node) === index
                }));
            });

            it('should identify a namespace', () => assert(SynergyDOM('foo').namespace));
        });
        
        describe('as a DOM query string', () => {
            it('should return all DOM elements that match the query', () => {
                assert([...SynergyDOM('.foo').DOMNodes].every((node, index) => {
                    return Array.from(document.querySelectorAll('.foo')).indexOf(node) === index
                }));

                assert([...SynergyDOM('#alpha').DOMNodes].every((node, index) => {
                    return Array.from(document.querySelectorAll('#alpha')).indexOf(node) === index
                }));
            });

            it('should identify a namespace', () => assert(SynergyDOM('.foo').namespace));
        });
        
        describe('as an HTMLElement', () => {
            it('should return the passed HTMLElement inside an Array', () => {
                assert([...SynergyDOM(document.getElementById('alpha')).DOMNodes].every(node => {
                    return [document.getElementById('alpha')].indexOf(node) === 0
                }));
            });

            it('should identify a namespace', () => assert(SynergyDOM(document.getElementById('alpha')).namespace));
        });
        
        describe('as a NodeList', () => {
            it('should return the passed NodeList', () => {
                assert([...SynergyDOM(document.querySelectorAll('.foo')).DOMNodes].every((node, index) => {
                    return Array.from(document.querySelectorAll('.foo')).indexOf(node) === index
                }));
            });

            it('should identify a namespace', () => assert(SynergyDOM(document.querySelectorAll('.foo')).namespace));
        });
    });
});