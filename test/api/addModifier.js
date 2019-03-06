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

/**
 * @note - instead of `addModifier`, these tests will use `modifier` in
 * conjunction with an `add` parameter, to prevent superfluous tests
 */
describe('sQuery `modifier` API', () => {
    beforeEach('setup DOM', () => {
        document.body.innerHTML = TEMPLATE;
    });

    it('should exist', () => {
        assert.equal(typeof sQuery().add, 'function');
        assert.equal(typeof sQuery().addModifier, 'function');
        assert.equal(typeof sQuery().modifier, 'function');
    });

    describe('when used to add a single modifier', () => {
        describe('to a single module', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('SVRNE');

                sQuery().modifier(EL, 'bar', 'add');
            });

            it('should correctly add the modifier to the module', () => {
                assert(EL.classList.contains('foo-bar'));
            });
        });

        describe('to a single component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');  

                sQuery().modifier(EL, 'qux', 'add');  
            });

            it('should correctly add the modifier to the component', () => {
                assert(EL.classList.contains('foo_bar-qux'));
            });
        });

        describe('to a single sub-component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('A0BG9');

                sQuery().modifier(EL, 'buzz', 'add');
            });

            it('should correctly add the modifier to the sub-component', () => {
                assert(EL.classList.contains('foo_bar_fizz-buzz'));
            });
        });

        describe('to multiple modules', () => {
            beforeEach('setup DOM', () => {
                ELS = document.querySelectorAll('#E0RZS, #HY7S3');

                sQuery().modifier(ELS, 'ginger', 'add');
            });

            it('should correctly add the modifier to the modules', () => {
                assert([...ELS].every(EL => EL.classList.contains('alpha-ginger')));
            });
        });

        describe('to multiple components', () => {
            describe('that are the same component', () => {
                beforeEach('setup DOM', () => {
                    ELS = document.querySelectorAll('#HH156, #KJ4PM');

                    sQuery().modifier(ELS, 'ginger', 'add');
                });

                it('should correctly add the modifier to the components', () => {
                    assert([...ELS].every(EL => EL.classList.contains('foo_bar-ginger')));
                });
            });

            describe('that are different components', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN'), 'ginger', 'add');
                });

                it('should correctly add the modifier to the components', () => {
                    assert(document.getElementById('HH156').classList.contains('foo_bar-ginger'));
                    assert(document.getElementById('FH5FN').classList.contains('foo_qux-ginger'));
                });
            });

            describe('that are different components of different modules', () => {
                beforeEach('setup DOM', () => {
                    sQuery().modifier(document.querySelectorAll('#HH156, #TKLD4'), 'ginger', 'add');
                });

                it('should correctly add the modifier to the components', () => {
                    assert(document.getElementById('HH156').classList.contains('foo_bar-ginger'));
                    assert(document.getElementById('TKLD4').classList.contains('alpha_beta-ginger'));
                });
            });
        });

        describe('to multiple sub-components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), 'ginger', 'add');
            });

            it('should correctly add the modifier to the sub-components', () => {
                assert(document.getElementById('A0BG9').classList.contains('foo_bar_fizz-ginger'));
                assert(document.getElementById('EI7RQ').classList.contains('foo_qux_fizz-ginger'));
                assert(document.getElementById('M1FAC').classList.contains('foo_qux_fizz_buzz-ginger'));
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
                assert(EL.classList.contains('foo-alpha-beta'));
            });
        });

        describe('to a single component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('HH156');

                sQuery().modifier(EL, ['alpha', 'beta'], 'add');
            });

            it('should correctly add the modifiers to the component', () => {
                assert(EL.classList.contains('foo_bar-alpha-beta'));
            });
        });

        describe('to a single sub-component', () => {
            beforeEach('setup DOM', () => {
                EL = document.getElementById('A0BG9');

                sQuery().modifier(EL, ['alpha', 'beta'], 'add');
            });

            it('should correctly add the modifiers to the sub-component', () => {
                assert(EL.classList.contains('foo_bar_fizz-alpha-beta'));
            });
        });

        describe('to multiple modules', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#SVRNE, #E0RZS'), ['hot', 'spicy'], 'add');
            });

            it('should correctly add the modifiers to the modules', () => {
                assert(document.getElementById('SVRNE').classList.contains('foo-hot-spicy'));
                assert(document.getElementById('E0RZS').classList.contains('alpha-hot-spicy'));
            });
        });

        describe('to multiple components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#HH156, #FH5FN, #TKLD4'), ['hot', 'spicy'], 'add');
            });

            it('should correctly add the modifiers to the components', () => {
                assert(document.getElementById('HH156').classList.contains('foo_bar-hot-spicy'));
                assert(document.getElementById('FH5FN').classList.contains('foo_qux-hot-spicy'));
                assert(document.getElementById('TKLD4').classList.contains('alpha_beta-hot-spicy'));
            });
        });

        describe('to multiple sub-components', () => {
            beforeEach('setup DOM', () => {
                sQuery().modifier(document.querySelectorAll('#A0BG9, #EI7RQ, #M1FAC'), ['hot', 'spicy'], 'add');
            });

            it('should correctly add the modifiers to the sub-components', () => {
                assert(document.getElementById('A0BG9').classList.contains('foo_bar_fizz-hot-spicy'));
                assert(document.getElementById('EI7RQ').classList.contains('foo_qux_fizz-hot-spicy'));
                assert(document.getElementById('M1FAC').classList.contains('foo_qux_fizz_buzz-hot-spicy'));
            });
        });
    });
});