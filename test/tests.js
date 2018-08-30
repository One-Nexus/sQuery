import assert from 'assert';
import jsdom from 'jsdom-global';
import SynergyDOM from '../src/squery';

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
        assert.equal(typeof SynergyDOM().find, 'function');
        assert.equal(typeof SynergyDOM().getComponent, 'function');
        assert.equal(typeof SynergyDOM().getComponents, 'function');
        assert.equal(typeof SynergyDOM().getModifiers, 'function');
        assert.equal(typeof SynergyDOM().getSubComponent, 'function');
        assert.equal(typeof SynergyDOM().getSubComponents, 'function');
        assert.equal(typeof SynergyDOM().has, 'function');
        assert.equal(typeof SynergyDOM().hasModifier, 'function');
        assert.equal(typeof SynergyDOM().is, 'function');
        assert.equal(typeof SynergyDOM().isComponent, 'function');
        assert.equal(typeof SynergyDOM().modifier, 'function');
        assert.equal(typeof SynergyDOM().removeModifier, 'function');
        assert.equal(typeof SynergyDOM().parent, 'function');
        assert.equal(typeof SynergyDOM().parentComponent, 'function');
        assert.equal(typeof SynergyDOM().setComponent, 'function');
        assert.equal(typeof SynergyDOM().subComponent, 'function');
        assert.equal(typeof SynergyDOM().subComponents, 'function');
        assert.equal(typeof SynergyDOM().unsetComponent, 'function');
    });

    describe('when invoked with `SynergyQuery` parameter', () => {
        beforeEach('setup DOM elements', () => {
            document.body.innerHTML = (`
                <div class="foo" id="SVRNE">
                    <div class="foo_lorem" id="HH156">
                        <div class="foo_lorem_ipsum" id="A0BG9"></div>
                    </div>
                    <div class="foo_lorem" id="HRJM1">
                        <div class="foo_lorem_ipsum-dolor-sit-amet" id="E0RZS"></div>
                        <div class="fizz" id="KJ4PM"></div>
                        <div class="foo-bar-qux" id="FH5FN"></div>
                    </div>
                    <div class="foo_ipsum" id="HY7S3"></div>
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
        describe('and `addModifier` method is called', () => {
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
                beforeEach('call the `add` method', () => {
                    SynergyDOM('#SVRNE').addModifier(['test1', 'test2']);
                });
    
                it('should have the added modifiers', () => {
                    assert(SynergyDOM('#SVRNE').DOMNode.classList.contains('foo-test1-test2'));
                });
            });
        });

        describe('and `component` method is called', () => {
            beforeEach('setup DOM elements', () => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE">
                        <div class="foo_lorem" id="HH156">
                            <div class="foo_lorem_ipsum" id="A0BG9">
                                <div class="foo_fizz" id="VQTLX"></div>
                            </div>
                        </div>
                        <div class="foo_lorem" id="HRJM1"></div>
                        <div class="foo_ipsum" id="HY7S3"></div>
                    </div>
                    <div class="foo bar" id="ZSAE6">
                        <div class="foo_lorem" id="N1WY1">
                            <div class="foo_lorem_ipsum" id="5THDC"></div>
                        </div>
                    </div>
                    <div class="foo bar" id="M1FAC">
                        <div class="foo_lorem" id="44Y3U">
                            <div class="foo_lorem_ipsum" id="EI7RQ"></div>
                        </div>
                    </div>
                `);
            });

            describe('with no parameters', () => {
                it('should find all child components', () => {
                    assert(NodeListsAreEqual(
                        SynergyDOM('#SVRNE').components(), 
                        document.querySelectorAll('#HH156, #HRJM1, #VQTLX, #HY7S3')
                    ));

                    assert(NodeListsAreEqual(
                        SynergyDOM('#SVRNE, #ZSAE6').components(), 
                        document.querySelectorAll('#HH156, #HRJM1, #VQTLX, #HY7S3, #N1WY1')
                    ));

                    assert(NodeListsAreEqual(
                        SynergyDOM('#A0BG9').components(), 
                        document.querySelectorAll('#VQTLX')
                    ));
                });
            });

            describe('with no `operator` parameter', () => {
                it('should find all child components filtered by the given parameter', () => {
                    assert(NodeListsAreEqual(
                        SynergyDOM('#SVRNE').component('lorem'), 
                        document.querySelectorAll('#HH156, #HRJM1')
                    ));

                    assert(NodeListsAreEqual(
                        SynergyDOM('#SVRNE').component('ipsum'), 
                        document.querySelectorAll('#HY7S3')
                    ));
                });
            });

            describe('with second parameter as `operator`', () => {
                describe('with `operator` as `find`', () => {
                    it('should find all child components filtered by the given parameter', () => {
                        assert(NodeListsAreEqual(
                            SynergyDOM('#SVRNE').component('lorem', 'find'), 
                            document.querySelectorAll('#HH156, #HRJM1')
                        ));

                        assert(NodeListsAreEqual(
                            SynergyDOM('#SVRNE').component('ipsum', 'find'), 
                            document.querySelectorAll('#HY7S3')
                        ));
                    });
                });

                describe('with `operator` as `is`', () => {
                    it('should determine whether element is the specified component', () => {
                        assert(SynergyDOM('#HH156').component('lorem', 'is'));
                        assert(SynergyDOM('#HY7S3').component('ipsum', 'is'));
                    });
                });

                describe('with `operator` as `set`', () => {
                    beforeEach(() => {
                        document.body.innerHTML = (`
                            <div data-module="fizz" id="VQTLX"></div>
                        `);

                        SynergyDOM('#VQTLX').component('lorem', 'set')
                    });

                    it('should set element as the specified Component', () => {
                        assert(document.getElementById('VQTLX').classList.contains('fizz_lorem'));
                    });
                });

                describe('with `operator` as `unset`', () => {
                    beforeEach(() => {
                        document.body.innerHTML = (`
                            <div class="fizz_lorem" id="HH156"></div>
                        `);

                        SynergyDOM('#HH156').component('lorem', 'unset')
                    });

                    it('should unnset element as the specified Component', () => {
                        assert(document.getElementById('HH156').classList.length === 0);
                    });
                });
            });

            describe('with second parameter as `callback`', () => {
                beforeEach(() => {
                    document.body.innerHTML = (`
                        <div class="foo" id="SVRNE">
                            <div class="foo_lorem" id="HH156"></div>
                            <div class="foo_lorem-alpha" id="HRJM1"></div>
                        </div>
                    `);

                    SynergyDOM('#SVRNE').component('lorem', element => element.classList.add('callback-success'));
                });

                it('should successfuly call the `callback` function', () => {
                    assert(document.getElementById('HH156').classList.contains('callback-success'));
                    assert(document.getElementById('HRJM1').classList.contains('callback-success'));
                });    
            });
        });

        describe('and `find` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE">
                        <div class="fizz" id="KJ4PM">
                            <div class="fizz_buzz" id="DD45Q"></div>
                            <div class="fizz_buzz-alpha" id="XU3V8"></div>
                        </div>
                        <div class="foo_lorem" id="HH156"></div>
                        <div class="foo_lorem-alpha" id="HRJM1"></div>
                    </div>
                `);
            });

            it('should find all requested child elements', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find({
                        module: 'fizz'
                    }),
                    document.querySelectorAll('#KJ4PM')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find({
                        module: 'fizz',
                        component: 'buzz'
                    }),
                    document.querySelectorAll('#DD45Q, #XU3V8')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find({
                        module: 'fizz',
                        component: 'buzz',
                        modifier: 'alpha'
                    }),
                    document.querySelectorAll('#XU3V8')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find({
                        component: 'lorem'
                    }),
                    document.querySelectorAll('#HH156, #HRJM1')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find({
                        component: 'lorem',
                        modifier: 'alpha'
                    }),
                    document.querySelectorAll('#HRJM1')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find('lorem'), 
                    document.querySelectorAll('#HH156, #HRJM1')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').find('fizz'), 
                    document.querySelectorAll('#KJ4PM')
                ));
            });
        });

        describe('and `getComponent` method is called', () => {
            it('should return the first instance of the matched component', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').getComponent('lorem'), 
                    document.querySelectorAll('#HH156')
                ));
            });
        });

        describe('and `getComponents` method is called', () => {
            it('should return all matched components', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').getComponents('lorem'), 
                    document.querySelectorAll('#HH156, #HRJM1')
                ));
            });
        });

        describe('and `getModifiers` method is called', () => {
            it('should return the modifiers of each matched element', () => {
                assert.equal(
                    JSON.stringify(SynergyDOM('#E0RZS').getModifiers()), 
                    JSON.stringify(['dolor', 'sit', 'amet'])
                );

                assert.equal(
                    JSON.stringify(SynergyDOM('#E0RZS, #FH5FN').getModifiers()), 
                    JSON.stringify(['dolor', 'sit', 'amet', 'bar', 'qux'])
                );
            });
        });

        describe('and `getSubComponent` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE">
                        <div class="foo_alpha" id="KJ4PM">
                            <div class="foo_alpha_beta" id="DD45Q"></div>
                            <div class="foo_alpha_beta" id="HRJM1"></div>
                        </div>
                    </div>
                `);
            });

            it('should return the first matched sub-component', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#KJ4PM').getSubComponent('beta'), 
                    document.querySelectorAll('#DD45Q')
                ));
    
                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').getSubComponent('beta', ['alpha']), 
                    document.querySelectorAll('#DD45Q')
                ));
            });
        });

        describe('and `getSubComponents` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE">
                        <div class="foo_alpha" id="KJ4PM">
                            <div class="foo_alpha_beta" id="DD45Q">
                                <div class="foo_alpha_beta_gamma" id="XU3V8">
                                    <div class="foo_alpha_beta_gamma_delta" id="HH156"></div>
                                </div>
                                <div class="foo_fizz" id="VQTLX></div>
                            </div>
                            <div class="foo_alpha_beta" id="HRJM1"></div>
                        </div>
                    </div>
                `);
            });

            it('should return all matched sub-components', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').getSubComponents('beta', ['alpha']), 
                    document.querySelectorAll('#DD45Q, #HRJM1')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#SVRNE').getSubComponents('delta', ['alpha', 'beta', 'gamma']), 
                    document.querySelectorAll('#HH156')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#KJ4PM').getSubComponents('beta'), 
                    document.querySelectorAll('#DD45Q, #HRJM1')
                ));
            });
        });

        describe('and `hasModifier` method is called', () => {            
            describe('with a single modifier', () => {
                it('determine if each matched element has the passed modifier', () => {
                    assert(SynergyDOM('#E0RZS').hasModifier('dolor'));
                });
            });

            describe('with an array of modifiers', () => {
                it('should have the added modifiers', () => {
                    assert(SynergyDOM('#E0RZS').hasModifier(['dolor', 'sit', 'amet']));
                });
            });
        });

        describe('and `is` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE">
                        <div class="fizz" id="KJ4PM">
                            <div class="fizz_buzz" id="DD45Q"></div>
                            <div class="fizz_buzz-alpha" id="XU3V8"></div>
                        </div>
                        <div class="foo_lorem" id="HH156"></div>
                        <div class="foo_lorem-alpha" id="HRJM1"></div>
                    </div>
                `);
            });

            it('should determine if the matched elements match the passed query', () => {
                assert(SynergyDOM('#SVRNE').is({
                    module: 'foo'
                }));

                assert(SynergyDOM('#HH156').is({
                    module: 'foo',
                    component: 'lorem'
                }));

                assert(SynergyDOM('#HRJM1').is({
                    module: 'foo',
                    component: 'lorem',
                    modifier: 'alpha'
                }));

                assert(SynergyDOM('#HH156').is({
                    component: 'lorem'
                }));

                assert(SynergyDOM('#HRJM1').is({
                    component: 'lorem',
                    modifier: 'alpha'
                }));

                assert(SynergyDOM('#HRJM1').is({
                    modifier: 'alpha'
                }));

                assert(SynergyDOM('#SVRNE').is('foo'));
                assert(SynergyDOM('#HH156').is('lorem'));
            });
        });
    
        describe('and `isComponent` method is called', () => {
            it('should determine if the matched elements are the passed component', () => {
                assert(SynergyDOM('#HH156').isComponent('lorem'));
                assert(SynergyDOM('#HH156, #HRJM1').isComponent('lorem'));
            });
        });

        describe('and `modifier` method is called', () => {
            describe('with no `operator` parameter', () => {
                it('should determine if each matched element has the specified modifier', () => {
                    assert(SynergyDOM('#FH5FN').modifier('qux'));
                    assert(SynergyDOM('#FH5FN').modifier('bar'));
                }); 
            });

            describe('with second parameter as `operator`', () => {
                describe('with `operator` as `is`', () => {
                    it('should determine if each matched element has the specified modifier', () => {
                        assert(SynergyDOM('#FH5FN').modifier('qux', 'is'));
                        assert(SynergyDOM('#FH5FN').modifier('bar', 'is'));
                    }); 
                });

                describe('with `operator` as `set`', () => {
                    beforeEach('call the `modifier` method', () => {
                        SynergyDOM('#SVRNE').modifier('test', 'set');
                    });

                    it('should add the specified modifier to each matched element', () => {
                        assert(document.getElementById('SVRNE').classList.contains('foo-test'));
                    });
                });

                describe('with `operator` as `unset`', () => {
                    beforeEach('call the `modifier` method', () => {
                        SynergyDOM('#HEN8Z').modifier('buzz', 'unset');
                    });

                    it('should remove the specified modifier(s) from each matched element', () => {
                        assert(!document.getElementById('HEN8Z').classList.contains('fizz-buzz'));
                        assert(document.getElementById('HEN8Z').classList.contains('fizz'));
                    }); 
                });
            });
        });

        describe('and `parent` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE" data-module="foo">
                        <div class="foo_bar" id="KJ4PM" data-component="bar">
                            <div class="foo_buzz" id="DD45Q" data-component="buzz"></div>
                            <div class="fizz" id="WJTAI" data-module="fizz">
                                <div class="fizz_qux" id="KPZCZ" data-component="qux">
                                    <div class="fizz_buzz" id="XU3V8" data-component="buzz"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
    
            it('should find the specified parent element', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#DD45Q').parent('module'),
                    document.querySelectorAll('#SVRNE')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#DD45Q').parent('component'),
                    document.querySelectorAll('#KJ4PM')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#XU3V8').parent('foo'),
                    document.querySelectorAll('#SVRNE')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#XU3V8').parent('fizz'),
                    document.querySelectorAll('#WJTAI')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#XU3V8').parent('bar'),
                    document.querySelectorAll('#KJ4PM')
                ));
            });
        });

        describe('and `parentComponent` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE" data-module="foo">
                        <div class="foo_bar" id="KJ4PM" data-component="bar">
                            <div class="fizz" id="WJTAI" data-module="fizz">
                                <div class="fizz_qux" id="KPZCZ" data-component="qux">
                                    <div class="fizz_buzz" id="XU3V8" data-component="buzz"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
            });
    
            it('should find the specified parent component', () => {
                assert(NodeListsAreEqual(
                    SynergyDOM('#XU3V8').parentComponent('qux'),
                    document.querySelectorAll('#KPZCZ')
                ));

                assert(NodeListsAreEqual(
                    SynergyDOM('#XU3V8').parentComponent('bar'),
                    document.querySelectorAll('#KJ4PM')
                ));
            });
        });

        describe('and `removeModifier` method is called', () => {
            describe('with a single modifier', () => {
                beforeEach('call the `modifier` method', () => {
                    SynergyDOM('#HEN8Z').removeModifier('buzz', 'unset');
                    SynergyDOM('#FH5FN').removeModifier('bar', 'unset');
                });

                it('should remove the specified modifier from each matched element', () => {
                    assert(!document.getElementById('HEN8Z').classList.contains('fizz-buzz'));
                    assert(document.getElementById('HEN8Z').classList.contains('fizz'));
                    assert(!document.getElementById('FH5FN').classList.contains('foo-bar-qux'));
                    assert(document.getElementById('FH5FN').classList.contains('foo-qux'));
                });
            });

            describe('with multiple modifiers', () => {
                beforeEach('call the `modifier` method', () => {
                    SynergyDOM('#FH5FN').removeModifier(['qux', 'bar'], 'unset');
                });

                it('should remove the specified modifiers from each matched element', () => {
                    assert(!document.getElementById('FH5FN').classList.contains('foo-bar-qux'));
                    assert(document.getElementById('FH5FN').classList.contains('foo'));
                });
            });
        });

        describe('and `setComponent` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE"></div>
                `);

                SynergyDOM('#SVRNE').setComponent('bar');
            });

            it('should set each matched element as the specified component', () => {
                assert(document.getElementById('SVRNE').classList.contains('foo_bar'));
                assert(!document.getElementById('SVRNE').classList.contains('foo'));
            });
        });

        describe('and `subComponent` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="foo" id="SVRNE">
                        <div class="foo_alpha" id="KJ4PM">
                            <div class="foo_alpha_beta" id="DD45Q">
                                <div class="foo_alpha_beta_gamma" id="XU3V8">
                                    <div class="foo_alpha_beta_gamma_delta" id="HH156"></div>
                                    <div class="foo_fizz" id="VQTLX"></div>
                                </div>
                            </div>
                            <div class="foo_alpha_beta" id="HRJM1"></div>
                        </div>
                    </div>
                `);
            });

            describe('with no parameters', () => {
                it('should find all child sub-components', () => {
                    assert(NodeListsAreEqual(
                        SynergyDOM('#KJ4PM').subComponents(),
                        document.querySelectorAll('#DD45Q, #HRJM1')
                    ));

                    assert(NodeListsAreEqual(
                        SynergyDOM('#XU3V8').subComponents(),
                        document.querySelectorAll('#HH156')
                    ));
                });
            });

            describe('with no `operator` parameter', () => {
                it('should find all child sub-components filtered by the given parameter', () => {
                    assert(NodeListsAreEqual(
                        SynergyDOM('#DD45Q').subComponents('gamma'),
                        document.querySelectorAll('#XU3V8')
                    ));

                    assert(NodeListsAreEqual(
                        SynergyDOM('#KJ4PM').subComponents('gamma'),
                        document.querySelectorAll('#DD45Q, #HRJM1')
                    ));
                });
            });

            describe('with second parameter as `operator`', () => {
                describe('with `operator` as `find`', () => {
                    it('should find all child sub-components filtered by the given parameter', () => {
                        assert(NodeListsAreEqual(
                            SynergyDOM('#KJ4PM').subComponents('gamma', 'find'),
                            document.querySelectorAll('#DD45Q, #HRJM1')
                        ));

                        assert(NodeListsAreEqual(
                            SynergyDOM('#KJ4PM').subComponents('gamma', 'find'),
                            document.querySelectorAll('#DD45Q, #HRJM1')
                        ));
                    });
                });

                describe('with `operator` as `is`', () => {
                    it('should determine whether each matched element is the specified sub-component', () => {
                        assert(SynergyDOM('#HH156').subComponents('delta', 'is'));
                        assert(SynergyDOM('#DD45Q, #HRJM1').subComponents('beta', 'is'));
                    });
                });
            });

            describe('with second parameter as `callback`', () => {
                beforeEach(() => {
                    document.body.innerHTML = (`
                        <div class="foo" id="SVRNE">
                            <div class="foo_alpha" id="KJ4PM">
                                <div class="foo_alpha_beta" id="DD45Q">
                                    <div class="foo_alpha_beta_gamma" id="XU3V8">
                                        <div class="foo_alpha_beta_gamma_delta" id="HH156"></div>
                                        <div class="foo_fizz" id="VQTLX"></div>
                                    </div>
                                </div>
                                <div class="foo_alpha_beta" id="HRJM1"></div>
                                <div class="foo_alpha_fizz" id="HRJM1"></div>
                            </div>
                        </div>
                    `);

                    SynergyDOM('#KJ4PM').subComponents('beta', element => element.classList.add('callback-success'));
                });

                it('should successfuly call the `callback` function', () => {
                    assert(document.getElementById('DD45Q').classList.contains('callback-success'));
                    assert(document.getElementById('HRJM1').classList.contains('callback-success'));
                });      
            });
        });

        describe('and `unsetComponent` method is called', () => {
            beforeEach(() => {
                document.body.innerHTML = (`
                    <div class="bar foo_test" id="SVRNE" data-module="foo"></div>
                `);

                SynergyDOM('#SVRNE').unsetComponent('test');
            });

            it('should unset each matched element as the specified component', () => {
                assert(document.getElementById('SVRNE').classList.length === 1);
                assert(document.getElementById('SVRNE').classList.contains('bar'));
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