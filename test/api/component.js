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
        <div class="foo_bar" id="KJ4PM">
            <div class="foo" id="N1WY1">
                <div class="foo_bar" id="ZSAE6"></div>
            </div>
        </div>
        <div class="alpha" id="HY7S3"></div>
    </div>
`);

document.body.innerHTML = TEMPLATE;

let EL, ELS;

describe('sQuery `component` API', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery().setComponent, 'function');
        assert.equal(typeof sQuery().unsetComponent, 'function');
        assert.equal(typeof sQuery().isComponent, 'function');
        assert.equal(typeof sQuery().getComponents, 'function');
        assert.equal(typeof sQuery().component, 'function');
    });

    describe('when used without `componentName` and `operator` parameters', () => {
        describe('on a single module', () => {
            it('should find all child components', () => {
                assert(NodeListsAreEqual(
                    sQuery().component(document.getElementById('SVRNE')),
                    document.querySelectorAll('#HH156, #FH5FN, #KJ4PM, #HRJM1')
                ));
            });
        });

        describe('on multiple modules', () => {
            it('should find all child components', () => {
                assert(NodeListsAreEqual(
                    sQuery().component(document.querySelectorAll('#SVRNE, #E0RZS')),
                    document.querySelectorAll('#HH156, #FH5FN, #KJ4PM, #HRJM1, #TKLD4')
                ));
            });
        });
    });

    describe('when used without `operator` parameter', () => {
        it('should find all specified child components', () => {
            assert(NodeListsAreEqual(
                sQuery().component(document.getElementById('SVRNE'), 'bar'),
                document.querySelectorAll('#HH156, #KJ4PM')
            ));
        });

        describe('and a modifier is specified in the config', () => {
            const config = {
                modifier: 'test',
                componentGlue: '_',
                modifierGlue: '-'
            };

            beforeEach('setup DOM', () => {
                sQuery().modifier(document.getElementById('HH156'), 'test', 'add');
            });

            it('should find all specified child components', () => {
                assert(NodeListsAreEqual(
                    sQuery().component(document.getElementById('SVRNE'), 'bar', 'find', config),
                    document.querySelectorAll('#HH156')
                ));
            });
        });
    });

    describe('when used with `first` operator', () => {
        describe('on a single module', () => {
            it('should find all specified child components', () => {
                assert.equal(
                    sQuery().component(document.getElementById('SVRNE'), 'bar', 'first'),
                    document.getElementById('HH156')
                );
            });
        });

        describe('on multiple modules', () => {
            it('should find all specified child components', () => {
                assert(NodeListsAreEqual(
                    sQuery().component(document.querySelectorAll('#SVRNE, #E0RZS'), 'beta', 'first'),
                    document.querySelectorAll('#HRJM1, #TKLD4')
                ));
            });
        });
    });

    describe('when used with `is` operator', () => {
        it('should determine if element is the specified component', () => {
            assert(sQuery().component(document.getElementById('HH156'), 'bar', 'is'));
            assert(sQuery().component(document.getElementById('FH5FN'), 'qux', 'is'));
            assert(!sQuery().component(document.getElementById('A0BG9'), 'bar', 'is'));
            assert(!sQuery().component(document.getElementById('A0BG9'), 'fizz', 'is'));
            assert(!sQuery().component(document.getElementById('HH156'), 'test', 'is'));
            assert(!sQuery().component(document.getElementById('FH5FN'), 'test', 'is'));
        });
    });

    describe('when used with `set` operator', () => {
        describe('to set a single component', () => {
            describe('on a single module', () => {
                beforeEach('setup DOM', () => {
                    EL = document.getElementById('SVRNE');
        
                    sQuery().component(EL, 'bar', 'set');
                });
        
                it('should set the element as the specified component', () => {
                    assert(sQuery().component(EL, 'bar', 'is'));
                });
            });

            describe('on multiple modules', () => {
                beforeEach('setup DOM', () => {
                    ELS = document.querySelectorAll('#SVRNE, #E0RZS');
        
                    sQuery().component(ELS, 'bar', 'set');
                });
        
                it('should set the element as the specified component', () => {
                    assert(sQuery().component(ELS, 'bar', 'is'));
                });
            });
        });

        describe('to set multiple components', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('SVRNE');
    
                sQuery().component(EL, ['fizz', 'buzz'], 'set');
            });
    
            it('should set the element as the specified component', () => {
                assert(sQuery().component(EL, ['fizz', 'buzz'], 'is'));
            });
        });
    });

    describe('when used with `unset` operator', () => {
        describe('to unset a single component', () => {
            describe('on a single module', () => {
                beforeEach('setup DOM', () => {
                    EL = document.getElementById('HH156');

                    sQuery().component(EL, 'bar', 'unset');
                });
        
                it('should unset the element as the specified component', () => {
                    assert(!sQuery().component(EL, 'bar', 'is'));
                });
            });

            describe('on multiple modules', () => {
                beforeEach('setup DOM', () => {
                    ELS = document.querySelectorAll('#HRJM1, #TKLD4');
        
                    sQuery().component(ELS, 'beta', 'unset');
                });
        
                it('should unset the element as the specified component', () => {
                    assert(!sQuery().component(EL, 'beta', 'is'));
                });
            });
        });

        describe('to unset multiple components', () => {
            beforeEach('setup DOM', () => {
                //TODO
            });
    
            it('should unset the element as the specified component', () => {
                //TODO
            });
        });
    });

    describe('when used with a callback operator', () => {
        beforeEach('setup DOM', () => {
            EL = document.getElementById('SVRNE');

            sQuery().component(EL, 'bar', node => node.className = 'success');
        });

        it('should execute the callback on each node', () => {
            assert(document.getElementById('HH156').className = 'success');
            assert(document.getElementById('KJ4PM').className = 'success');
        });
    });
});