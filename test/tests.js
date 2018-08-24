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
        assert.equal(typeof SynergyDOM().addModifier, 'function');
        assert.equal(typeof SynergyDOM().component, 'function');
        assert.equal(typeof SynergyDOM().components, 'function');
    });

    describe('when invoked with `SynergyQuery` parameter', () => {
        beforeEach('setup dummy elements', () => {
            document.body.innerHTML = (`
                <div class="foo" id="SVRNE">
                    <div class="foo_lorem" id="HH156">
                        <div class="foo_lorem_ipsum" id="00BG9"></div>
                    </div>
                    <div class="foo_lorem" id="HRJM1">
                        <div class="foo_lorem_ipsum-dolor-sit-amet" id="E0RZS"></div>
                        <div class="fizz" id="KJ4PM"></div>
                        <div class="foo-bar-qux" id="FH5FN"></div>
                    </div>
                </div>
                <div class="foo bar" data-module="foo" id="ZSAE6">
                    <div class="foo_lorem" data-component="lorem" id="N1WY1">
                        <div class="foo_lorem_ipsum" data-sub-component="ipsum" id="5THDC"></div>
                    </div>
                </div>
                <div class="foo bar" data-module="alpha" id="M1FAC">
                    <div class="foo_lorem" data-component="beta" id="44Y3U">
                        <div class="foo_lorem_ipsum" data-sub-component="gamma" id="EI7RQ"></div>
                    </div>
                </div>
                <div class="foo-bar" id="TKLD4"></div>
                <div class="fizz" id="VQTLX"></div>
                <div class="fizz-buzz" id="HEN8Z"></div>
            `);
        });
    
        afterEach('clean the document', () => {
            document.body.innerHTML = '';
        });
        
        describe('as a Module name', () => {
            it('should return all DOM elements that match the module name', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('foo').DOMNodes, 
                    document.querySelectorAll('.foo, [class*="foo-"]'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM('bar').DOMNodes, 
                    document.querySelectorAll('.bar, [class*="bar-"]'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM('fizz').DOMNodes, 
                    document.querySelectorAll('.fizz, [class*="fizz-"]'))
                );
            });
        });
        
        describe('as a DOM query string', () => {
            it('should return all DOM elements that match the query', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('.foo').DOMNodes, 
                    document.querySelectorAll('.foo'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM('.bar').DOMNodes, 
                    document.querySelectorAll('.bar'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').DOMNodes, 
                    document.querySelectorAll('#SVRNE'))
                );
            });
        });
        
        describe('as an HTMLElement', () => {
            it('should return the passed HTMLElement inside an Array', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM(document.getElementById('SVRNE')).DOMNodes, 
                    [document.getElementById('SVRNE')])
                );
            });
        });
        
        describe('as a NodeList', () => {
            it('should return the passed NodeList', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM(document.querySelectorAll('.foo')).DOMNodes, 
                    document.querySelectorAll('.foo'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM(document.querySelectorAll('div')).DOMNodes, 
                    document.querySelectorAll('div'))
                );
            });
        });

        describe('as an array where the first value is the query', () => {
            it('should return the expected nodes based off the query', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM(['foo']).DOMNodes, 
                    document.querySelectorAll('.foo, [class*="foo-"]'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM(['.foo']).DOMNodes, 
                    document.querySelectorAll('.foo'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM(['#SVRNE']).DOMNodes, 
                    document.querySelectorAll('#SVRNE'))
                );
            });
        });

        describe('as an object which contains a name key corresponding to a module name', () => {
            it('should return all DOM elements that match the module name', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM({ name: 'foo' }).DOMNodes, 
                    document.querySelectorAll('.foo, [class*="foo-"]'))
                );
                assert(NodeListsAreEqual(
                    SynergyDOM({ name: 'fizz' }).DOMNodes, 
                    document.querySelectorAll('.fizz, [class*="fizz-"]'))
                );
            });
        });

        /**
         * `add` and `addModifier` reference the same function, so
         * only one needs to be tested
         */
        describe('and `add` method is called', () => {
            describe('with a single modifier', () => {
                beforeEach('call the `add` method', () => {
                    SynergyDOM('#SVRNE').addModifier('test');
                    SynergyDOM('#M1FAC').addModifier('test');
                    SynergyDOM('#ZSAE6').addModifier('test');
                    SynergyDOM('#HEN8Z').addModifier('test');
                });

                it('should have the added modifier', () => {
                    assert(SynergyDOM('#SVRNE').DOMNode.classList.contains('foo-test'));
                    assert(SynergyDOM('#M1FAC').DOMNode.classList.contains('alpha-test'));
                    assert(SynergyDOM('#ZSAE6').DOMNode.classList.contains('foo-test'));
                    assert(SynergyDOM('#HEN8Z').DOMNode.classList.contains('fizz-test'));
                });
            });
            describe('with an array of modifiers', () => {
                it('should have the added modifiers', () => {
                });
            });
        });

        describe('and `component` method is called', () => {
            describe('with no parameters', () => {
                it('should find all child components', () => {
                    assert(NodeListsAreEqual(
                        SynergyDOM('#SVRNE').components(), 
                        document.querySelectorAll('#HH156, #HRJM1')
                    ));
                    assert(NodeListsAreEqual(
                        SynergyDOM('#SVRNE, #ZSAE6').components(), 
                        document.querySelectorAll('#HH156, #HRJM1, #N1WY1')
                    ));
                });
            });
            describe('with no `operator` parameter', () => {
                it('should find all child components filtered by the component parameter', () => {
                    console.log(SynergyDOM('#SVRNE').component('#lorem'));
                });
            });
            describe('with second parameter as `operator`', () => {
                describe('with `operator` as `find`', () => {
                    it('should find all child components filtered by the component parameter', () => {
                    });
                });
                describe('with `operator` as `is`', () => {
                    it('should determine whether element is the specified component', () => {
                    });
                });
                describe('with `operator` as `set`', () => {
                    it('should set element as the specified Component', () => {
                    });
                });
                describe('with `operator` as `unset`', () => {
                    it('should unnset element as the specified Component', () => {
                    });
                });
            });
            describe('with second parameter as `callback`', () => {
                it('should successfuly call the `callback` function', () => {
                });    
            });
        });
    });
});

/**
 * Determine whether two NodeLists are equal
 * 
 * @param {*} actual 
 * @param {*} expected 
 */
function NodeListsAreEqual(actual, expected) {
    if ((actual.length || Object.keys(actual).length) !== (expected.length || Object.keys(expected).length)) {
        return false;
    }

    return Array.from(actual).every((node, index) => node === expected[index]);
}