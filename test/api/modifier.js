const TEMPLATE = (`
    <div class="foo foo-pancake test" id="SVRNE">
        <div class="foo_bar" id="HH156">
            <div class="foo_bar_fizz" id="A0BG9"></div>
            <div class="foo_beta" id="HRJM1"></div>
            <div class="alpha" id="E0RZS">
                <div class="alpha_beta" id="TKLD4"></div>
            </div>
        </div>
        <div class="foo_qux" id="FH5FN">
            <div class="foo_qux_fizz" id="EI7RQ">
                <div class="foo_qux_fizz_buzz" id="M1FAC"></div>
            </div>
        </div>
        <div class="foo_bar" id="KJ4PM"></div>
        <div class="alpha" id="HY7S3"></div>
    </div>
`);

document.body.innerHTML = TEMPLATE;

let EL, ELS;

describe('sQuery `modifier` API', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery().addModifier, 'function');
        assert.equal(typeof sQuery().removeModifier, 'function');
        assert.equal(typeof sQuery().hasModifier, 'function');
        assert.equal(typeof sQuery().add, 'function');
        assert.equal(typeof sQuery().remove, 'function');
        assert.equal(typeof sQuery().is, 'function');
        assert.equal(typeof sQuery().modifier, 'function');
    });

    describe('when used without parameters', () => {
        describe('on a single module', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');

                sQuery().modifier(EL, ['fizz', 'buzz'], 'add');
            });

            it('should return the active modifiers', () => {
                assert(NodeListsAreEqual(sQuery().modifier(EL), ['fizz', 'buzz']));
            });
        });

        describe('on multiple modules', () => {
            beforeEach('setup DOM', () => {
                ELS = document.querySelectorAll('#HH156, #HY7S3');

                sQuery().modifier(ELS, ['fizz', 'buzz'], 'add');
            });

            it('should return the active modifiers', () => {
                assert(NodeListsAreEqual(sQuery().modifier(ELS), ['fizz', 'buzz']));
            });
        });
    });

    describe('when used to add a single modifier', () => {
        describe('to a single module', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('SVRNE');

                sQuery().modifier(EL, 'bar', 'add');
            });

            it('should correctly add the modifier to the module', () => {
                assert(sQuery().modifier(EL, 'bar', 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(EL, 'bar', 'remove');
                });
    
                it('should correctly remove the modifier from the module', () => {
                    assert(!sQuery().modifier(EL, 'bar', 'is'));
                });
            });
        });

        describe('to a single component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');  

                sQuery().modifier(EL, 'qux', 'add');  
            });

            it('should correctly add the modifier to the component', () => {
                assert(sQuery().modifier(EL, 'qux', 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(EL, 'qux', 'remove');
                });
    
                it('should correctly remove the modifier from the component', () => {
                    assert(!sQuery().modifier(EL, 'qux', 'is'));
                });
            });
        });

        describe('to a single sub-component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('A0BG9');

                sQuery().modifier(EL, 'buzz', 'add');
            });

            it('should correctly add the modifier to the sub-component', () => {
                assert(sQuery().modifier(EL, 'buzz', 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(EL, 'buzz', 'remove');
                });
    
                it('should correctly remove the modifier from the sub-component', () => {
                    assert(!sQuery().modifier(EL, 'buzz', 'is'));
                });
            });
        });

        describe('to multiple modules', () => {
            beforeEach('setup DOM', () => {
                ELS = document.querySelectorAll('#E0RZS, #HY7S3');

                sQuery().modifier(ELS, 'ginger', 'add');
            });

            it('should correctly add the modifier to the modules', () => {
                assert(sQuery().modifier(ELS, 'ginger', 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(ELS, 'ginger', 'remove');
                });
    
                it('should correctly remove the modifier from the modules', () => {
                    assert(!sQuery().modifier(ELS, 'ginger', 'is'));
                });
            });
        });

        describe('to multiple components', () => {
            describe('that are the same component', () => {
                beforeEach('setup DOM', () => {
                    ELS = document.querySelectorAll('#HH156, #KJ4PM');

                    sQuery().modifier(ELS, 'ginger', 'add');
                });

                it('should correctly add the modifier to the components', () => {
                    sQuery().modifier(ELS, 'ginger', 'is');
                });

                describe('and is then removed', () => {
                    beforeEach('setup DOM', () => {
                        sQuery().modifier(ELS, 'ginger', 'remove');
                    });
        
                    it('should correctly remove the modifier from the components', () => {
                        assert(!sQuery().modifier(ELS, 'ginger', 'is'));
                    });
                });
            });

            describe('that are different components', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN'), 'ginger', 'add');
                });

                it('should correctly add the modifier to the components', () => {
                    assert(sQuery().modifier(document.getElementById('HH156'), 'ginger', 'is'));
                    assert(sQuery().modifier(document.getElementById('FH5FN'), 'ginger', 'is'));
                });

                describe('and is then removed', () => {
                    beforeEach('setup DOM', () => {
                        sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN'), 'ginger', 'remove');
                    });
        
                    it('should correctly remove the modifier from the components', () => {
                        assert(!sQuery().modifier(document.getElementById('HH156'), 'ginger', 'is'));
                        assert(!sQuery().modifier(document.getElementById('FH5FN'), 'ginger', 'is'));
                    });
                });
            });

            describe('that are different components of different modules', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #TKLD4'), 'ginger', 'add');
                });

                it('should correctly add the modifier to the components', () => {
                    assert(sQuery().modifier(document.getElementById('HH156'), 'ginger', 'is'));
                    assert(sQuery().modifier(document.getElementById('TKLD4'), 'ginger', 'is'));
                });

                describe('and is then removed', () => {
                    beforeEach('setup DOM', () => {
                        sQuery().modifier(document.querySelectorAll('#HH156, #TKLD4'), 'ginger', 'remove');
                    });
        
                    it('should correctly remove the modifier from the components', () => {
                        assert(!sQuery().modifier(document.getElementById('HH156'), 'ginger', 'is'));
                        assert(!sQuery().modifier(document.getElementById('TKLD4'), 'ginger', 'is'));
                    });
                });
            });
        });

        describe('to multiple sub-components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), 'ginger', 'add');
            });

            it('should correctly add the modifier to the sub-components', () => {
                assert(sQuery().modifier(document.getElementById('A0BG9'), 'ginger', 'is'));
                assert(sQuery().modifier(document.getElementById('EI7RQ'), 'ginger', 'is'));
                assert(sQuery().modifier(document.getElementById('M1FAC'), 'ginger', 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), 'ginger', 'remove');
                });
    
                it('should correctly remove the modifier from the sub-components', () => {
                    assert(!sQuery().modifier(document.getElementById('A0BG9'), 'ginger', 'is'));
                    assert(!sQuery().modifier(document.getElementById('EI7RQ'), 'ginger', 'is'));
                    assert(!sQuery().modifier(document.getElementById('M1FAC'), 'ginger', 'is'));
                });
            });
        });
    });

    describe('when used to add multiple modifiers', () => {
        describe('to a single module', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('SVRNE');

                sQuery().modifier(EL, ['alpha', 'beta'], 'add');
            });

            it('should correctly add the modifiers to the module', () => {
                assert(sQuery().modifier(EL, ['alpha', 'beta'], 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(EL, ['alpha', 'beta'], 'remove');
                });
    
                it('should correctly remove the modifiers from the module', () => {
                    assert(!sQuery().modifier(EL, ['alpha', 'beta'], 'is'));
                });
            });
        });

        describe('to a single component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');

                sQuery().modifier(EL, ['alpha', 'beta'], 'add');
            });

            it('should correctly add the modifiers to the component', () => {
                assert(sQuery().modifier(EL, ['alpha', 'beta'], 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(EL, ['alpha', 'beta'], 'remove');
                });
    
                it('should correctly remove the modifiers from the component', () => {
                    assert(!sQuery().modifier(EL, ['alpha', 'beta'], 'is'));
                });
            });
        });

        describe('to a single sub-component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('A0BG9');

                sQuery().modifier(EL, ['alpha', 'beta'], 'add');
            });

            it('should correctly add the modifiers to the sub-component', () => {
                assert(sQuery().modifier(EL, ['alpha', 'beta'], 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(EL, ['alpha', 'beta'], 'remove');
                });
    
                it('should correctly remove the modifiers from the sub-component', () => {
                    assert(!sQuery().modifier(EL, ['alpha', 'beta'], 'is'));
                });
            });
        });

        describe('to multiple modules', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#SVRNE, #E0RZS'), ['hot', 'spicy'], 'add');
            });

            it('should correctly add the modifiers to the modules', () => {
                assert(sQuery().modifier(document.getElementById('SVRNE'), ['hot', 'spicy'], 'is'));
                assert(sQuery().modifier(document.getElementById('E0RZS'), ['hot', 'spicy'], 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#SVRNE, #E0RZS'), ['hot', 'spicy'], 'remove');
                });
    
                it('should correctly remove the modifiers from the module', () => {
                    assert(!sQuery().modifier(document.getElementById('SVRNE'), ['hot', 'spicy'], 'is'));
                    assert(!sQuery().modifier(document.getElementById('E0RZS'), ['hot', 'spicy'], 'is'));
                });
            });
        });

        describe('to multiple components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN, #TKLD4'), ['hot', 'spicy'], 'add');
            });

            it('should correctly add the modifiers to the components', () => {
                assert(sQuery().modifier(document.getElementById('HH156'), ['hot', 'spicy'], 'is'));
                assert(sQuery().modifier(document.getElementById('FH5FN'), ['hot', 'spicy'], 'is'));
                assert(sQuery().modifier(document.getElementById('TKLD4'), ['hot', 'spicy'], 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN, #TKLD4'), ['hot', 'spicy'], 'remove');
                });
    
                it('should correctly remove the modifiers from the components', () => {
                    assert(!sQuery().modifier(document.getElementById('HH156'), ['hot', 'spicy'], 'is'));
                    assert(!sQuery().modifier(document.getElementById('FH5FN'), ['hot', 'spicy'], 'is'));
                    assert(!sQuery().modifier(document.getElementById('TKLD4'), ['hot', 'spicy'], 'is'));
                });
            });
        });

        describe('to multiple sub-components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), ['hot', 'spicy'], 'add');
            });

            it('should correctly add the modifiers to the sub-components', () => {
                assert(sQuery().modifier(document.getElementById('A0BG9'), ['hot', 'spicy'], 'is'));
                assert(sQuery().modifier(document.getElementById('EI7RQ'), ['hot', 'spicy'], 'is'));
                assert(sQuery().modifier(document.getElementById('M1FAC'), ['hot', 'spicy'], 'is'));
            });

            describe('and is then removed', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), ['hot', 'spicy'], 'remove');
                });
    
                it('should correctly remove the modifiers from the sub-components', () => {
                    assert(!sQuery().modifier(document.getElementById('A0BG9'), ['hot', 'spicy'], 'is'));
                    assert(!sQuery().modifier(document.getElementById('EI7RQ'), ['hot', 'spicy'], 'is'));
                    assert(!sQuery().modifier(document.getElementById('M1FAC'), ['hot', 'spicy'], 'is'));
                });
            });
        });
    });
});